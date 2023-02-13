import { BaseType, select } from 'd3-selection';
import * as d3 from 'd3';
import { barAreaColor, barCompareColor, barDefaultColor, barFocusColor, selectColor1, selectColor2, sucessColor } from '../../../constants/Color';
import Input from '../../../constants/Input';
import { Dataset } from '../../create';
import { blink, blinkStroke } from '../../animation-helper';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid } from 'uuid';
import { getSVGHeight, getSVGWidth, SVG_HEIGHT, SVG_WIDTH } from '../../../constants/Values';


/*
  _____  ______ _____ 
 |  __ \|  ____/ ____|
 | |  | | |__ | (___  
 | |  | |  __| \___ \ 
 | |__| | |    ____) |
 |_____/|_|   |_____/ 
                                    
*/

type Pair = {
  num: number,
  element: BaseType;
}


export default (
  svg: SVGSVGElement | null,
  setRunInfo: React.Dispatch<React.SetStateAction<RunInfoType>>,
  duration: number,
  dataset: Dataset,
  data: Map<Input, any>,
  setAlgoDuration: React.Dispatch<React.SetStateAction<number>>,
  runInfo: RunInfoType):
  number => {
  
  const array = select(svg).selectAll('rect').nodes();
  const numbers = select(svg).selectAll('text').nodes();
  
  let currDuration = 0;
  
  const SVG_WIDTH = getSVGWidth();
  const SVG_HEIGHT = getSVGHeight();
  const n = array.length;
  
  const sizeX = dataset.params['size'];
  const offset = dataset.params['offset'];
  const fSize = dataset.params['fSize'];
  
  const map = new Map<BaseType, BaseType[]>();
 

  let oldBucket: Pair[] = [];

  for (let i = 0; i < array.length; i++) {
    const num: number = parseInt(select(array[i]).text());

    oldBucket.push({ num, element: array[i]});
    const digits = select(svg).selectAll('text').filter(function (d) { return select(this).attr('element') == i.toString() }).nodes();
    map.set(array[i], digits);
  }
  
  for (let k = 0; k < 3; k++) {
    const newBucket: Pair[][] = [];

    for (let i = 0; i < 10; i++) {
      newBucket.push([]);
    }

    for (let i = 0; i < oldBucket.length; i++) {
      const num = oldBucket[i].num;
      const lastDigit = num % 10;
      const newNum = Math.floor(num / 10);
      newBucket[lastDigit].push({ num: newNum, element: oldBucket[i].element });

      const digitElems = map.get(oldBucket[i].element);
      if (digitElems!.length - 1 - k >= 0) {
        const index = digitElems!.length - 1 - k;
        
        select(digitElems![index])
          .transition('color-digit')
          .delay(currDuration += 200)
          .duration(200)
          .style('font-weight', 500)
          .attr('fill', selectColor2);
      }

    }

    const countGroups = getGroups(newBucket);

    //create bucket animation

    let xPos = 0;

    const widthTakenBuckets = SVG_WIDTH - ((sizeX * n) + (countGroups * (sizeX / 2))) + (sizeX / 2);
    type XY = { x: number, y: number };

    const xyMap: Map<BaseType, XY> = new Map();
    
    for (let i = 0; i < newBucket.length; i++) {
      if (newBucket[i].length > 0) {
        const l = newBucket[i].length;
        for (let z = 0; z < l; z++) {
          
          const x = xPos + (widthTakenBuckets / 2);
          const y = SVG_HEIGHT/2 + (sizeX*1.5) + 3
          select(svg)
            .append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('fill', 'white')
            .attr('width', sizeX)
            .attr('height', 3)
            .style('opacity', 0)
          .attr('bucket-group', i);
          
          xyMap.set(newBucket[i][z].element, {x,y})
          
          xPos += sizeX;
        }

        select(svg)
          .append('text')
          .attr('x', xPos + (widthTakenBuckets / 2) - ((l * sizeX)/2))
          .attr('y', SVG_HEIGHT / 2 + (sizeX*1.5) + (sizeX/2))
          .attr('fill', 'white')
          .style("text-anchor", "middle")
          .attr('bucket-group', i)
          .text(i)
          .style('opacity', 0)
          .style('font-size', sizeX / 4);
        xPos += sizeX / 2;
        
      }
    }
    const copyOldBucket = [...oldBucket];

    for (let i = 0; i < copyOldBucket.length; i++) {
      const elem = copyOldBucket[i].element
      d3.timeout(() => select(elem).style('stroke', barCompareColor), currDuration);
      const numText = map.get(elem);
      const o = numText!.length;

      const bucketIndex = (o - k - 1 >= 0) ? parseInt(select(numText![o - k - 1]).text()) : 0;
      
      const bucketElems = select(svg).selectAll('*').filter(function (d) { return select(this).attr('bucket-group') == bucketIndex.toString() });

      bucketElems.transition('show-buckets')
        .delay(currDuration)
        .duration(250)
        .style('opacity', 1);
      

      select(oldBucket[i].element)
            .transition('move-array-into-bucket')
            .delay(currDuration)
            .duration(1000)
            .attr('x', xyMap.get(elem)!.x)
        .attr('y', xyMap.get(elem)!.y - sizeX)
      
      
      for (let z = 0; z < numText!.length; z++) {
      
        select(numText![z])
            .transition('move-text-into-bucket')
            .delay(currDuration)
            .duration(1000)
            .attr('x', xyMap.get(elem)!.x + ((fSize / 1.5) * z) + (sizeX/3))
            .attr('y', xyMap.get(elem)!.y - (sizeX/2))

      }
      
      currDuration += 1000
          
    }


    //fade away buckets

    for (let i = 0; i < newBucket.length; i++) {
      if (newBucket[i].length > 0) {
        const bucketElems = select(svg).selectAll('*').filter(function (d) { return select(this).attr('bucket-group') == i.toString() });
        const digitElems = select(svg).selectAll('text').filter(function (d) { return select(this).attr('digit') != null });

        digitElems.transition('digit-color-original')
        .delay(currDuration)
        .duration(200 * (bucketElems.size()))
        .style('font-weight', 400)
        .attr('fill', 'white');

        
        bucketElems.transition('fade-buckets')
        .delay(currDuration += 200)
        .duration(200)
          .style('opacity', 0)
          .on('end', function (this) { select(this).remove() })
        
        for (let z = 0; z < newBucket[i].length; z++) {
          const elem = newBucket[i][z].element;

          select(elem)
            .transition('stroke-original')
            .delay(currDuration)
            .duration(150)
            .style('stroke', barDefaultColor)
        }

        currDuration += 150;
      }
    }
    

    oldBucket = []

    let count = 0;

    for (let i = 0; i < newBucket.length; i++) {
      for (let j = 0; j < newBucket[i].length; j++) {
        oldBucket.push(newBucket[i][j]);

        const elem = newBucket[i][j].element;
        const digitElems = map.get(elem);
        const rectY = SVG_HEIGHT / 10;
        const rectX = (count * sizeX) + offset;

        select(elem)
          .transition('move-array-to-original-pos')
          .delay(currDuration)
          .duration(200)
          .attr('x', rectX)
          .attr('y', rectY)
        
        for (let z = 0; z < digitElems!.length; z++) {
          const digitElem = digitElems![z];
          const o = sizeX / digitElems!.length;

          const textX = (count * sizeX) + offset + (sizeX / 2) - (fSize) + ((fSize / 1.5) * z) + (o / 4);
          const textY = SVG_HEIGHT / 10 + (sizeX / 2);

          select(digitElem)
          .transition('move-text-to-original-pos')
          .delay(currDuration)
          .duration(200)
          .attr('x', textX)
          .attr('y', textY)

        }

        count++;
        currDuration += 200;
      }
    }




  }

  for (let i = 0; i < oldBucket.length; i++) {
    const elem = oldBucket[i].element;
    d3.timeout(() => blinkStroke(select(elem), 1000), currDuration);
  }




  
  return currDuration;
}

const getGroups = (buckets: Pair[][]): number => {

  let count = 0;

  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].length > 0) count++;
  }

  return count;
}
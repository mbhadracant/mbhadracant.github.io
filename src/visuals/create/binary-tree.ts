import { select } from "d3-selection";
import { ConfigData } from "../../config";
import { barDefaultColor, barFocusColor } from "../../constants/Color";
import DataType from "../../constants/DataType";
import { getSVGHeight, getSVGWidth } from "../../constants/Values";
import { Dataset } from "../create";
import array from "./array";

export default (n: number, svg: SVGElement, config: ConfigData): Dataset => {

  
  const SVG_WIDTH = getSVGWidth();
  const SVG_HEIGHT = getSVGHeight();
  
  let counter = 0;
  
  const limit = 10;

  const array = Array.from({ length: n }, () => Math.floor(Math.random() * limit));

  const levels = getLevels(array);

  const size = (SVG_WIDTH / (n))/(levels);

  let level = 1;

  const getX = (i: number, level: number, len: number) => ((SVG_WIDTH / 2 - (size / 2))) + (i * ((size * 10) + ((level))));

  enum NodeDirection {
    LEFT,RIGHT
  }

  type QueueData = {
    num: number,
    parentX: number;
    parentY: number;
    direction: NodeDirection | null;
    parentId: number;
    parentElem: d3.Selection<SVGCircleElement, unknown, null, undefined> | null;
  }

  const queue: QueueData[] = [];


  queue.push({ num: array[0], parentX: 0, parentY: 0, direction: null, parentId: -1, parentElem: null});
  
  const map: Map<d3.Selection<SVGCircleElement, unknown, null, undefined>, number> = new Map();
  
  let offsetX =  ((SVG_WIDTH*levels)/4) / (Math.pow(level+1,2)) + size;

  while (queue.length > 0) {

    const len = queue.length;
   
    const offset = getX(len - 1, level, len) - getX(0, level, len);
    

    for (let i = 0; i < len; i++) {
      const queueData = queue.shift();
      const parentX = queueData!.parentX;
      const parentY = queueData!.parentY;
      const direction = queueData!.direction;

      let currX = (getX(i, level, len) - offset / 2);
      let currY = ((SVG_HEIGHT / (levels + 1)) * level) - (size * 2);

      if (level >= 2) {
        
        if (direction == NodeDirection.LEFT) {
          currX = parentX - (offsetX);
        } else {
          currX = parentX + (offsetX);
        }
        currY = (SVG_HEIGHT/(levels) - (size)) * level;
      }
     
      const circle = select(svg).append('circle')
        .attr('r', size)
        .attr('cx', currX)
        .attr('cy', currY)
        .attr('fill', barDefaultColor)
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .attr('node-id', counter)
        .attr('parent-id', queueData!.parentId)
      
      // const text = select(svg).append('text')
      //   .attr('x', currX)
      //   .attr('y', currY)
      //   .attr('fill', 'white')
      //   .text(array[counter]);
      
        if (queueData!.parentElem != null) {

          select(svg).append("line")
          .attr("x1", d=>currX)
          .attr("y1", d=>currY)
          .attr("x2", d=>queueData!.parentX)
          .attr("y2", d => queueData!.parentY)
          .attr('parent-id', queueData!.parentId)
          .attr('child-id', counter)
          .attr("stroke-width", 2)
          .attr("stroke", 'rgba(107, 230, 255, 0.5)');
          
          if (direction == NodeDirection.LEFT) queueData!.parentElem!.attr('node-left', counter);
          else queueData!.parentElem!.attr('node-right', counter);
        }
        
        counter++;

        if (counter < array.length) {
          queue.push({ num: array[counter], parentX: currX, parentY: currY, direction: NodeDirection.LEFT, parentId: counter - 1, parentElem: circle });
          queue.push({ num: array[counter], parentX: currX, parentY: currY, direction: NodeDirection.RIGHT, parentId: counter - 1, parentElem: circle });
        }
    }

    if (counter >= n) break;
    level++;
    offsetX /= 2;

  }

 

  
  
  //const elements = select(svg).selectAll('*').nodes().filter(i => select(i).attr('id').includes('element'))

  return { data: array, dataType: DataType.BAR, params: {}, svgElements: []}
}


const getLevels = (arr: number[]) => {
  let level = 0;
  let counter = 0;
  const queue: number[] = [];
  queue.push(arr[0]);

  while (queue.length > 0) {
    
    const len = queue.length;

    for (let i = 0; i < len; i++) {
      queue.shift();
      counter++;
      
      
      if (counter < arr.length) {
        queue.push(counter);
        queue.push(counter);
      }
    }
    if (counter >= arr.length) break;
    level++;
  }

  return level + 1;
}
import { select } from 'd3-selection';
import * as d3 from 'd3';
import { barAreaColor, barCompareColor, barDefaultColor, barFocusColor, selectColor1, sucessColor } from '../../../constants/Color';
import Input from '../../../constants/Input';
import { blink } from '../../animation-helper';
import { Dataset } from '../../create';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid } from 'uuid';


/*
  ____  _                           _____                     _     
 |  _ \(_)                         / ____|                   | |    
 | |_) |_ _ __   __ _ _ __ _   _  | (___   ___  __ _ _ __ ___| |__  
 |  _ <| | '_ \ / _` | '__| | | |  \___ \ / _ \/ _` | '__/ __| '_ \ 
 | |_) | | | | | (_| | |  | |_| |  ____) |  __/ (_| | | | (__| | | |
 |____/|_|_| |_|\__,_|_|   \__, | |_____/ \___|\__,_|_|  \___|_| |_|
                            __/ |                                   
                           |___/                                    
*/
export default (
  svg: SVGSVGElement | null,
  setRunInfo: React.Dispatch<React.SetStateAction<RunInfoType>>,
  duration: number,
  dataset: Dataset,
  data: Map<Input, any>,
  setAlgoDuration: React.Dispatch<React.SetStateAction<number>>,
  runInfo: RunInfoType):
  number => {
  
    const bars = select(svg).selectAll('rect').nodes().sort((a, b) => parseInt(select(a).attr('x')) - parseInt(select(b).attr('x')));
    let currDuration = 0;

    
  const selected = data.get(Input.SELECT_1);
  const selectedHeight = parseInt(selected.attr('height'));
  
  let left = 0;
  let right = bars.length - 1;

  while (left <= right) {
    const mid = Math.floor((right + left) / 2);
    const midBar = select(bars[mid]);
    const midHeight = parseInt(midBar.attr('height'));

    for (let j = left; j <= right; j++) {
      const currIndex = j;
      const curr = select(bars[currIndex]);
      d3.timeout(() => {
        curr.transition()
        .ease(d3.easeLinear)
        .duration(100)
        .attr("y",parseFloat(curr.attr("y")) - 5)
      }, currDuration);

      if (curr.attr('id') == selected.attr('id')) continue;
      d3.timeout(() => {
        curr.attr('fill', barAreaColor);
      }, currDuration);
    }

    currDuration += 500;

    d3.timeout(() => midBar.attr('fill', barFocusColor), currDuration);
    
    currDuration += 500;
    const prevLeft = left;
    const prevRight = right;

    if (selectedHeight < midHeight) {
      right = mid - 1;
    } else if (selectedHeight > midHeight) {
      left = mid + 1;
    } else {
      d3.timeout(() => {
        select(svg).selectAll('rect').attr('fill', barDefaultColor);
        
        for (let j = 0; j < bars.length; j++) {
          if (j >= prevLeft && j <= prevRight) {
            const currIndex = j;
            const curr = select(bars[currIndex]);
            curr.transition('binary-search-1')
              .ease(d3.easeLinear)
              .duration(100)
              .attr("y", parseFloat(curr.attr("y")) + 5)
          }
        }

        currDuration += 100;
        d3.timeout(() => blink(midBar), 100);
    }, currDuration)
       return currDuration;
    }

    
    d3.timeout(() => {
      select(svg).selectAll('rect').attr('fill', barDefaultColor);
      
      for (let j = 0; j < bars.length; j++) {
        if (j >= prevLeft && j <= prevRight) {
          const currIndex = j;
          const curr = select(bars[currIndex]);
          curr.transition('binary-search-2')
            .ease(d3.easeLinear)
            .duration(100)
            .attr("y", parseFloat(curr.attr("y")) + 5)
        }
      }
      currDuration += 100;
    }, currDuration);

    d3.timeout(() => selected.attr('fill', selectColor1), currDuration);
    currDuration += 500;
  }

  return currDuration;

}
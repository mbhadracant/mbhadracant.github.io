import { BaseType, select } from 'd3-selection';
import * as d3 from 'd3';
import { barAreaColor, barCompareColor, barDefaultColor, barFocusColor, sucessColor } from '../../../constants/Color';
import Input from '../../../constants/Input';
import { Dataset } from '../../create';
import { blink, pulseCircle } from '../../animation-helper';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid } from 'uuid';

/*
  ____  ______ _____ 
 |  _ \|  ____/ ____|
 | |_) | |__ | (___  
 |  _ <|  __| \___ \ 
 | |_) | |    ____) |
 |____/|_|   |_____/                                 
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
  let currDuration = 0;

  const durationIncrease = 150;

  const root = getNode(svg!, 0);

  
  const queue = [root];

  while (queue.length > 0) {
    
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
    
      const nodeId = node?.attr('node-id');
      const left = node?.attr('node-left');
      const right = node?.attr('node-right');
      const line = getParentLine(svg!, parseInt(nodeId!));

      if (left) queue.push(getNode(svg!, parseInt(left)))
      if (right) queue.push(getNode(svg!, parseInt(right)))
    
      if (line.nodes().length > 0) {
        const parentX = parseFloat(line.attr('x2'));
        const parentY = parseFloat(line.attr('y2'));
        const currX = parseFloat(node!.attr('cx'));
        const currY = parseFloat(node!.attr('cy'));
        const newLine = line.clone()
          .attr('stroke', barCompareColor)
          .attr('x1', parentX)
          .attr('x2', parentX)
          .attr('y1', parentY)
          .attr('y2', parentY);

        newLine.transition('animate-line')
          .delay(currDuration)
          .duration(durationIncrease)
          .attr('x2', currX)
          .attr('y2', currY);
      }

      d3.timeout(() => {
        node!.attr('fill', barCompareColor);
        pulseCircle(node!, durationIncrease*3);
      }, currDuration += durationIncrease)
    }

  }

  
  
  return currDuration;
}


const getNode = (svg: SVGElement, id: number): d3.Selection<BaseType, unknown, SVGElement, unknown>  => {
  return select(svg).selectAll('circle').filter(function (d) { return select(this).attr('node-id') === id.toString() });
}

const getParentLine = (svg: SVGElement, id: number): d3.Selection<BaseType, unknown, SVGElement, unknown>  => {
  return select(svg).selectAll('line').filter(function (d) { return select(this).attr('child-id') === id.toString() });
}


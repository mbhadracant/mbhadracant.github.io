import { BaseType, select } from 'd3-selection';
import * as d3 from 'd3';
import { barAreaColor, barCompareColor, barDefaultColor, barFocusColor, sucessColor } from '../../../constants/Color';
import Input from '../../../constants/Input';
import { Dataset } from '../../create';
import { blink } from '../../animation-helper';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid } from 'uuid';


/*
  _____  ______ _____ 
 |  __ \|  ____/ ____|
 | |  | | |__ | (___  
 | |  | |  __| \___ \ 
 | |__| | |    ____) |
 |_____/|_|   |_____/ 
                                    
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

  const elements = select(svg).selectAll('*').nodes().filter(i => select(i).attr('id').includes('element'))
  
  const size = Math.sqrt(elements.length);

  const matrix: any = []

  let counter = 0;
  const visited: any = [];

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    visited[i] = []

    for (let j = 0; j < size; j++) {
      matrix[i][j] = elements[counter];
  
      
      
      visited[i][j] = false;
      counter++;
    }
  }
    
  const target = data.get(Input.SELECT_2);
  const targetCol = parseInt(target.attr('col'));
  const targetRow = parseInt(target.attr('row'));
  const r = parseFloat(target.attr('r'));

  let found = false;

  const dfs = (node: d3.Selection<any, unknown, null, undefined>) => {

    const col = parseInt(node.attr('col'));
    const row = parseInt(node.attr('row'));

    if (visited[col][row]) return;

    visited[col][row] = true;
    

    if (col == targetCol && row == targetRow) {
      d3.timeout(() => blink(node), currDuration);
      found = true;
      return;
    }

    if (found) return;

    currDuration += 30;

    d3.timeout(() => {
      node.attr('fill', barCompareColor);
      const pulse = node.clone(true)
          .attr('fill', 'transparent')
          .attr('stroke-width', '1')
          .attr('stroke', barDefaultColor)
          .attr('r', r);

        pulse
          .transition()
          .duration(750)
          .attr('r', r*3)
          .style('opacity', 0)
          .on('end', function () {
            pulse.remove();
          });
    }, currDuration);

    if (col > 0) dfs(select(matrix[col - 1][row]))
    if (row < size - 1) dfs(select(matrix[col][row + 1]))
    if (col < size - 1) dfs(select(matrix[col + 1][row]))
    if (row > 0) dfs(select(matrix[col][row - 1]))
    

  }

  dfs(data.get(Input.SELECT_1))

  // const queue: d3.Selection<any, unknown, null, undefined>[] = [data.get(Input.SELECT_1)];
  
  
  // let x = 0;
  // let found = false;

  // while (queue.length != 0) {
    
  //   const n = queue.length;

  //   for (let i = 0; i < n; i++) {
  //     const node = queue.shift();
  //     if (node == undefined) continue;

  //     const col = parseInt(node.attr('col'));
  //     const row = parseInt(node.attr('row'));
  //     if (visited[col][row]) continue;

  //     currDuration += 30;

  //     visited[col][row] = true;

  //     d3.timeout(() => {
  //       node.attr('fill', barCompareColor);

  //       const pulse = node.clone(true)
  //         .attr('fill', 'transparent')
  //         .attr('stroke-width', '1')
  //         .attr('stroke', barDefaultColor)
  //         .attr('r', r);

  //       pulse
  //         .transition()
  //         .duration(750)
  //         .attr('r', r*3)
  //         .style('opacity', 0)
  //         .on('end', function () {
  //           pulse.remove();
  //         });

  //   }, currDuration);

        
  //     if (col == targetCol && row == targetRow) {
        


  //       d3.timeout(() => blink(node), currDuration);
  //       found = true;
  //       break;
  //     }

  //     if (col > 0) queue.push(select(matrix[col - 1][row]))
  //     if (row < size - 1) queue.push(select(matrix[col][row + 1]))
  //     if (col < size - 1) queue.push(select(matrix[col + 1][row]))
  //     if (row > 0) queue.push(select(matrix[col][row - 1]))

      
  //   }

  //   if (found) break;
 
  //   currDuration += 200;
  // }

  

  return currDuration;
}
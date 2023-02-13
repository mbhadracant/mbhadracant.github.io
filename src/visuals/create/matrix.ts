import { select } from "d3-selection";
import { ConfigData } from "../../config";
import { barDefaultColor } from "../../constants/Color";
import DataType from "../../constants/DataType";
import { getSVGHeight, getSVGWidth } from "../../constants/Values";
import { Dataset } from "../create";

export default (n: number, svg: SVGElement, config: ConfigData): Dataset => {
  const matrix = new Array(n);

  let counter = 0;
  for (let i = 0; i < n; i++) {
      matrix[i] = [];

      for (let j = 0; j < n; j++) {
          matrix[i][j] = counter++;
      }
  }
  const SVG_WIDTH = getSVGWidth();
  const SVG_HEIGHT = getSVGHeight();

  const offsetHeight = ((SVG_HEIGHT / n));
  const offsetWidth = ((SVG_WIDTH / n));
  
  const size = (((SVG_HEIGHT/10) / n) + ((SVG_WIDTH/10) / n)/1.5)
  const widthTaken = SVG_WIDTH - ((((size*3.5)) *n) - (size*1.5))
  
  counter = 0;

  
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          const circle = select(svg).append('circle')
          circle.attr('id', 'element-' + counter++)
              .attr('r', size)
              .attr('cx', (size) + (size*3.5) * j + widthTaken/2)
              .attr('cy', ((offsetHeight) * i) + (size*1.5))
              .attr('fill', barDefaultColor)
              .attr('col', i)
              .attr('row', j);
      }
  }
  
  
  const elements = select(svg).selectAll('*').nodes().filter(i => select(i).attr('id').includes('element'))

  return { data: matrix, dataType: DataType.BAR, params: {}, svgElements: elements}
}
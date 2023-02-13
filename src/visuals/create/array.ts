import { select } from "d3-selection";
import { Dataset } from ".";
import { ConfigData } from "../../config";
import { barDefaultColor } from "../../constants/Color";
import DataType from "../../constants/DataType";
import { getSVGWidth, getSVGHeight } from "../../constants/Values";

export default (n: number, svg: SVGElement, config: ConfigData): Dataset => {
  const params: any = {};

  let counter = 0;
  
  const SVG_WIDTH = getSVGWidth();
  const SVG_HEIGHT = getSVGHeight();

  const offsetHeight = ((SVG_HEIGHT / n));
  const offsetWidth = ((SVG_WIDTH / n));
  
  const limit = 999;

  const dataset = Array.from({length: n}, () => Math.floor(Math.random() * limit));

  const digits = limit.toString().length;
 
  let sizeX = ((SVG_WIDTH) / (n) / 1.5);

  if (sizeX > SVG_HEIGHT / 3) {
      sizeX -= (sizeX/2.5)
  }
  const offset = ((SVG_WIDTH) / 2) - ((n * sizeX)/2)
  const fSize = sizeX / 4;

  const widthTaken = SVG_WIDTH - ((((sizeX*3.5)) *n) - (sizeX*1.5))

  for (let i = 0; i < n; i++) {
  
      const rect = select(svg)
          .append('rect')
          .attr('id', 'element-' + counter++)
          .attr('array-index', i)
          .attr('width', sizeX)
          .attr('height', sizeX)
          .attr('x', (i * sizeX) + offset)
          .attr('y', SVG_HEIGHT / 10)
          .text(dataset[i])
          .attr('fill', 'transparent')
          .style('stroke-width', 2)
          .style("stroke", barDefaultColor)
      
      const numDigitsLength = dataset[i].toString().length;
      const numDigits = Array.from(dataset[i].toString())
      const o = sizeX / numDigitsLength;

      for (let k = 0; k < numDigitsLength; k++) {
          const text = select(svg)
              .append('text')
              .attr('fill', 'white')
              .attr('x', (i * sizeX) + offset + (sizeX / 2) - (fSize) + ((fSize / 1.5) * k) + (o / 4))
              .attr('y', SVG_HEIGHT / 10 + (sizeX / 2))
              .attr('digit', k)
              .attr('element', counter - 1)
              .style("text-anchor", "middle")
              .text((j) => numDigits[k])
              .style('font-size', fSize);
      }
      
  }
  
  
  const elements = select(svg).selectAll('*').nodes();

  params['maxDigits'] = digits;
  params['size'] = sizeX;
  params['offset'] = offset;
  params['fSize'] = fSize;

  return {data: dataset, dataType: DataType.ARRAY,params, svgElements: elements}
}
import { BaseType, select } from "d3-selection";
import { ConfigData } from "../../config";
import DataType, { getDefaultElements } from "../../constants/DataType";
import createMatrix from './matrix';
import createBinaryTree from './binary-tree';
import createBars from './bars';
import createArray from './array';
import { getSVGWidth, getSVGHeight } from "../../constants/Values";

export interface Dataset {
  dataType: DataType,
  data: any,
  params: { [key: string]: any },
  svgElements: BaseType[] 
}

export const generate = (n: number, config: ConfigData, svg: SVGElement): Dataset => {
  const dataType = config.dataType;
  if (n == 0) n = getDefaultElements(config.dataType);

  select(svg).selectAll("*").remove()   

  switch (dataType) {
      case DataType.BAR:
          return createBars(n, svg, config);
      case DataType.MATRIX:
          return createMatrix(n, svg, config);
      case DataType.GRAPH:
          return createBars(n, svg, config);
      case DataType.ARRAY:
          return createArray(n, svg, config);
      case DataType.BINARY_TREE:
          return createBinaryTree(n, svg, config);
  }

}


export const resize = (svg: SVGSVGElement | null, dataType: DataType) => {
  
  const SVG_WIDTH = getSVGWidth();
  const SVG_HEIGHT = getSVGHeight();

  if (dataType == DataType.MATRIX) {
      const nodes: BaseType[] = select(svg).selectAll('circle').nodes();

      const n = Math.sqrt(nodes.length);
      const size = ((SVG_HEIGHT/10) / n) + ((SVG_WIDTH/10) / n)/1.5

      const widthTaken = SVG_WIDTH - ((((size * 3.5)) * n) - (size * 1.5))
      
      
      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const row = parseInt(select(node).attr('row'));
          

          select(node)
              .transition()
              .duration(600)
              .attr('r', size)
              .attr('cx', (size) + (size*3.5) * row + widthTaken/2)
      }
     
  }

  if (dataType == DataType.BAR) {
      const nodes: BaseType[] = select(svg).selectAll('rect').nodes();

      const n = nodes.length;
      const offset = ((SVG_WIDTH / n)) * 0.25;
      
      
      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          
          select(node)
              .transition()
              .duration(600)
              .attr('width', (SVG_WIDTH / n) - offset)
              .attr('x', (i * ((SVG_WIDTH / n))))

      }
     
  }


}
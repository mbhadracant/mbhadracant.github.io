import * as d3 from "d3";
import { select, BaseType } from "d3-selection";
import { Dataset } from ".";
import { ConfigData } from "../../config";
import Algorithms from "../../constants/Algorithms";
import { barDefaultColor } from "../../constants/Color";
import DataType from "../../constants/DataType";
import { getSVGWidth, getSVGHeight } from "../../constants/Values";

export default (n: number, svg: SVGElement, config: ConfigData): Dataset => {
  const dataset = createRandomArray(n, config);
  const SVG_WIDTH = getSVGWidth();
  const SVG_HEIGHT = getSVGHeight();

  const offset = ((SVG_WIDTH / n)) * 0.25;
  select(svg).selectAll("*").remove()    

      select(svg)
          .selectAll('rect')
          .data(dataset)
          .enter()
          .append('rect')
          .attr('id', (d, i) => `bar-${i.toString()}`)
          .attr('width', (SVG_WIDTH / dataset.length) - offset)
          .attr('height', (d) => d)
          .attr('x', (d, i) => (i * ((SVG_WIDTH / dataset.length))))
          .attr('y', (d) => SVG_HEIGHT - d)
          .attr('fill', barDefaultColor);
  
  
  const bars = select(svg).selectAll('rect').nodes().sort((a, b) => parseInt(select(a).attr('x')) - parseInt(select(b).attr('x')));

  return { data: dataset, dataType: DataType.BAR, params: {}, svgElements: bars}
}

function shuffle(array : number[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const createRandomArray = (n : number, config: ConfigData) => {

  const data = [];
  
  for(let i = 0; i < n; i++) {
      data.push(i);
  }

  let randomData = shuffle(data);

  if (config.algo == Algorithms.BINARY_SEARCH) {
      randomData = randomData.sort((a,b) => a - b)
  }

  const scale = d3.scaleLinear()
      .domain([0, Math.max(...data)])
      .range([10, getSVGHeight()]);

  return randomData.map(x => scale(x)!);
}

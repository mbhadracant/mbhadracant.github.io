import { SVG_WIDTH, SVG_HEIGHT } from "../constants/Values";
import { BaseType, select } from 'd3-selection';
import { barDefaultColor } from "../constants/Color";
import * as d3 from 'd3';
import Algorithms from "../constants/Algorithms";
import DataType from "../constants/DataType";
import { ConfigData } from "../config";

export interface Dataset {
    dataType: DataType,
    data: any
    svgElements: BaseType[] 
}

export const generate = (n: number, config: ConfigData, svg: SVGElement): Dataset | undefined => {
    const dataType = config.dataType;
    if (n == 0) n = dataType;

    select(svg).selectAll("*").remove()   

    switch (dataType) {
        case DataType.BAR:
            return createBars(n, svg, config);
        case DataType.MATRIX:
            return createMatrix(n, svg, config);
    }

}


const createMatrix = (n: number, svg: SVGElement, config: ConfigData): Dataset => {
    const matrix = new Array(n);

    let counter = 0;
    for (let i = 0; i < n; i++) {
        matrix[i] = [];

        for (let j = 0; j < n; j++) {
            matrix[i][j] = counter++;
        }
    }

    const offsetHeight = ((SVG_HEIGHT / n));
    const offsetWidth = ((SVG_WIDTH / n));
    
    let size = SVG_WIDTH / (n*n/2)
    
    counter = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const circle = select(svg).append('circle')
            circle.attr('id', 'element-' + counter++)
                .attr('r', size)
                .attr('cx', offsetWidth * j + (offsetWidth / 3))
                .attr('cy', ((offsetHeight) * i) + (offsetHeight / 3))
                .attr('fill', barDefaultColor)
                .attr('col', i)
                .attr('row', j);
        }
    }
    
    
    const elements = select(svg).selectAll('*').nodes().filter(i => select(i).attr('id').includes('element'))

    return {data: matrix, dataType: DataType.BAR, svgElements: elements}
}

const createBars = (n: number, svg: SVGElement, config: ConfigData): Dataset => {
    const dataset = createRandomArray(n, config);

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

    return {data: dataset, dataType: DataType.BAR, svgElements: bars}
}

function shuffle(array : number[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
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
        .range([10, SVG_HEIGHT]);

    return randomData.map(x => scale(x)!);
}

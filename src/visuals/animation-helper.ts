import { barCompareColor, barDefaultColor, sucessColor } from "../constants/Color";
import { v4 } from 'uuid';
import { BaseType } from "d3";

const blink = (element: d3.Selection<any, unknown, null, undefined>, duration = 100) => {
  const repeat = () => {
    element
      .transition(v4())
      .duration(duration)
      .attr('fill', sucessColor)
      .on('end', function () {
        element
        .transition(v4())
        .duration(duration)
        .attr('fill', barDefaultColor)
        .on('end', function () {
          repeat();
        });
      });

  }
  
  repeat();
}

const blinkStroke = (element: d3.Selection<any, unknown, null, undefined>, duration = 100) => {
  const repeat = () => {

    element
      .transition(v4())
      .duration(duration)
      .style('stroke', sucessColor)
      .on('end', function () {
        element
        .transition(v4())
        .duration(duration)
        .style('stroke', barDefaultColor)
        .on('end', function () {
          repeat();
        });
      });

  }
  
  repeat();
}

const pulseCircle = (element: d3.Selection<BaseType, unknown, SVGElement, unknown>, duration = 750, color = barCompareColor) => {
  const r = parseFloat(element.attr('r'));
  const pulse = element.clone(true)
  .attr('fill', 'transparent')
  .style('stroke-width', '1')
  .style('stroke', color)
  .attr('r', r);

  pulse
  .transition()
  .duration(duration)
  .attr('r', r*5)
  .style('opacity', 0)
  .on('end', function () {
    pulse.remove();
  });


}


export { blink, blinkStroke, pulseCircle };

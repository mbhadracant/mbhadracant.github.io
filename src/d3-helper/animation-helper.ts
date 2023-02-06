import { barDefaultColor, sucessColor } from "../constants/Color";

const blink = (element: d3.Selection<any, unknown, null, undefined>) => {
  const repeat = () => {
    element
      .transition()
      .duration(100)
      .attr('fill', sucessColor)
      .on('end', function () {
        element
        .transition()
        .duration(100)
        .attr('fill', barDefaultColor)
        .on('end', function () {
          repeat();
        });
      });

  }
  
  repeat();
}

export { blink };
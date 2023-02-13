import { select, selectAll, BaseType } from "d3-selection";
import * as d3 from 'd3';
import { barCompareColor, barAreaColor, barDefaultColor, barFocusColor } from "../../../constants/Color";
import { Dataset } from "../../create";
import Input from "../../../constants/Input";
import { RunInfoType } from "../../../constants/Types";
import { v4 as uuid } from 'uuid';
import { getSVGWidth } from "../../../constants/Values";

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

  const bars = select(svg).selectAll('rect').nodes().sort((a, b) => parseFloat(select(a).attr('x')) - parseFloat(select(b).attr('x')));
  
  function quickSort (arr : BaseType[], left: number, right: number) {
    if (left >= right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    const pivot = arr[mid];
    const index = partition(arr, left, right, pivot);
    quickSort(arr, left, index - 1);
    quickSort(arr, index, right);
  } 

  function partition(arr: BaseType[], left: number, right: number, pivot: BaseType): number {

    for (let i = left; i <= right; i++) {
      d3.timeout(() => select(arr[i]).attr('fill', barAreaColor), currDuration);
    }

    const pivotVal = parseFloat(select(pivot).attr('height'));
    d3.timeout(() => select(pivot).attr('fill', barFocusColor), currDuration);
    currDuration += duration;

    while (left <= right) {
      
      while (getHeight(arr[left]) < pivotVal) {
        left++;
      }

      while (getHeight(arr[right]) > pivotVal) {
        right--;
      }

      const barLeft = select(arr[left]);
      const barRight = select(arr[right]);

      if (left <= right) {
        if (arr[left] != arr[right]) {

        
          const tempId = select(arr[left]).attr('id');
          select(arr[left]).attr('id', select(arr[right]).attr('id'));
          select(arr[right]).attr('id', tempId);

          const temp = arr[right];
          arr[right] = arr[left];
          arr[left] = temp;

          const rightId = select(arr[right]).attr('id').substring(4);
          const leftId = select(arr[left]).attr('id').substring(4);

         
          
          d3.timeout(() => {
            if(barRight.attr('fill') !== barFocusColor) barRight.attr('fill', barCompareColor);
            if(barLeft.attr('fill') !== barFocusColor) barLeft.attr('fill', barCompareColor);
          }, currDuration);

          barLeft
            .transition()
            .delay(currDuration)
            .duration(duration)
            .attr('x', ((parseInt(rightId)) * ((getSVGWidth() / bars.length))))
            .on('end', function () {
              if (barLeft.attr('fill') !== barFocusColor) select(this).attr('fill', barAreaColor);
            });

          barRight
            .transition()
            .delay(currDuration)
            .duration(duration)
            .attr('x', ((parseInt(leftId)) * ((getSVGWidth() / bars.length))))
            .on('end', function () {
              if (barRight.attr('fill') !== barFocusColor) select(this).attr('fill', barAreaColor);
            });

          currDuration += duration;
          
      
        }
        left++;
        right--;
      }

    }

    d3.timeout(() => {
      selectAll('rect')
        .filter(function () {
          return d3.select(this).attr("fill") == barFocusColor || d3.select(this).attr("fill") == barAreaColor;
        }).attr('fill', barDefaultColor);
    }, currDuration);

    return left;
  }

  quickSort(bars, 0, bars.length - 1);
  return currDuration;

}

const getHeight = (bar: BaseType) => parseFloat(select(bar).attr('height'));

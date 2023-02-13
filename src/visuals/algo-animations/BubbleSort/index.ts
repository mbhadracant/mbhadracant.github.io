import { select } from 'd3-selection';
import * as d3 from 'd3';
import { barCompareColor, barDefaultColor } from '../../../constants/Color';
import { getSVGHeight, getSVGWidth, SVG_WIDTH } from '../../../constants/Values';
import { Dataset } from '../../create';
import Input from '../../../constants/Input';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid } from 'uuid';

export default (
    svg: SVGSVGElement | null,
    setRunInfo: React.Dispatch<React.SetStateAction<RunInfoType>>,
    duration: number,
    dataset: Dataset,
    data: Map<Input, any>,
    setAlgoDuration: React.Dispatch<React.SetStateAction<number>>,
    runInfo: RunInfoType):
number => {
    
    const bars = select(svg).selectAll('rect').nodes().sort((a, b) => parseInt(select(a).attr('x')) - parseInt(select(b).attr('x')));
    let currDuration = 0;
  
    for(let j = 0; j < bars.length - 1; j++) {
        let swaps = false;
        for (let i = 0; i < bars.length - 1 - j; i++) {
            
            const first = select(bars[i]);
            const second = select(bars[i+1]);
            d3.timeout(() => first.attr('fill', barCompareColor), currDuration);
            d3.timeout(() => second.attr('fill', barCompareColor), currDuration);
            
            currDuration += duration;

            if (parseFloat(first.attr('height')) > parseFloat(second.attr('height'))) {
                first
                    .transition("swap1")
                    .duration(duration)
                    .delay(currDuration)
                    .attr('x', ((i+1) * getSVGWidth() / bars.length))
                    .on('end', function () {
                        select(this).attr('fill', barDefaultColor);
                    });

                second
                    .transition("swap2")
                    .duration(duration)
                    .delay(currDuration)
                    .attr('x', (i * getSVGWidth() / bars.length))
                    .on('end', function () {
                        select(this).attr('fill', barDefaultColor)
                    });

                    swaps = true;
                    const temp = bars[i];
                    bars[i] = bars[i+1];
                    bars[i+1] = temp;
                    currDuration += duration;
            } else {
                d3.timeout(() => first.attr('fill',barDefaultColor), currDuration);
                d3.timeout(() => second.attr('fill',barDefaultColor), currDuration);
            }

        }
        if(!swaps) {
            return currDuration;
        }
    }

    return currDuration;
}
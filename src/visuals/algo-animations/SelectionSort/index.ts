import { select } from 'd3-selection';
import * as d3 from 'd3';
import { barCompareColor, barDefaultColor, barFocusColor } from '../../../constants/Color';
import Input from '../../../constants/Input';
import { Dataset } from '../../create';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid} from 'uuid';
import { getSVGWidth } from '../../../constants/Values';

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
        let min = Number.MAX_VALUE;
        let minIndex = -1;
        
        d3.timeout(() => console.log(`starting`), currDuration);
        for (let i = j; i < bars.length; i++) {
            const curr = select(bars[i]);
            const minBar = select(bars[minIndex]);
            
            d3.timeout(() => curr.attr('fill', barCompareColor), currDuration);
            currDuration += duration;
            const height = parseFloat(curr.attr('height'));
            
            if (height < min) {
                minIndex = i;
                min = height;
                d3.timeout(() => curr.attr('fill', barFocusColor), currDuration);
                d3.timeout(() => minBar.attr('fill', barDefaultColor), currDuration);
                
            } else {
                d3.timeout(() => curr.attr('fill', barDefaultColor), currDuration);
            }
        }
        
        const first = select(bars[minIndex]);
        const second = select(bars[j]);

        first
            .transition("swap2")
            .duration(duration)
            .delay(currDuration)
            .attr('x', ((j) * getSVGWidth() / bars.length))
            .on('end', function () {
                select(this).attr('fill', barDefaultColor);
            });

        second
            .transition("swap1")
            .duration(duration)
            .delay(currDuration)
            .attr('x', ((minIndex) * getSVGWidth() / bars.length))
            .on('end', function () {
                select(this).attr('fill', barDefaultColor);
            });
            
            currDuration += duration;

            const temp = bars[minIndex];
            bars[minIndex] = bars[j];
            bars[j] = temp;
    }

    return currDuration;
}
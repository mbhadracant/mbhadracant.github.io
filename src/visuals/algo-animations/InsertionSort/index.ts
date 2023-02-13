import { select } from 'd3-selection';
import * as d3 from 'd3';
import { barCompareColor, barDefaultColor, barFocusColor } from '../../../constants/Color';
import Input from '../../../constants/Input';
import { Dataset } from '../../create';
import { RunInfoType } from '../../../constants/Types';
import { v4 as uuid } from 'uuid';
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
  
    for(let j = 0; j < bars.length; j++) {
        let currIndex = j;
        const curr = select(bars[currIndex]);
        const currHeight = parseFloat(curr.attr('height'));
        d3.timeout(() => curr.attr('fill', barFocusColor), currDuration);
        currDuration += duration;
        for (let i = j-1; i >= 0; i--) {
            
            const target = select(bars[i]);
            d3.timeout(() => target.attr('fill', barCompareColor), currDuration);
            currDuration += duration;
            const targetHeight = parseFloat(target.attr('height'));
            
            
            if (currHeight < targetHeight) {
                curr
                    .transition("swap2")
                    .duration(duration)
                    .delay(currDuration)
                    .attr('x', ((i) * getSVGWidth() / bars.length))

    
                target
                    .transition("swap1")
                    .duration(duration)
                    .delay(currDuration)
                    .attr('x', ((currIndex) * getSVGWidth() / bars.length))
                    .on('end', function () {
                        select(this).attr('fill', barDefaultColor);
                    });
                    currDuration += duration;
                    const temp = bars[i];
                    bars[i] = bars[currIndex];
                    bars[currIndex] = temp;
                    currIndex = i;
                
            } else {
                d3.timeout(() => curr.attr('fill', barDefaultColor), currDuration);
                d3.timeout(() => target.attr('fill', barDefaultColor), currDuration);
                break;
            }
        }
        
        d3.timeout(() => curr.attr('fill', barDefaultColor), currDuration);
        currDuration += duration;
        
    }

    return currDuration;

}
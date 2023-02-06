import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3-selection';
import styled from 'styled-components';
import RunButton from '../../Shared/RunButton';
import NumberInput from '../../Shared/NumberInput';
import RefreshDataButton from '../../Shared/RefreshDataButton';
import SpeedSlider from '../../Shared/SpeedSlider';
import RunningAnimation from '../../Shared/RunningAnimation';
import Svg from '../../Shared/Svg';
import * as d3 from 'd3';
import Title from '../../Shared/Title';
import MainContent from '../../Shared/MainContent';
import SidePanel from '../../Shared/SidePanel';
import { Dataset, generate } from '../../../d3-helper/create';
import Input from '../../../constants/Input';
import Algorithms from '../../../constants/Algorithms';
import { barDefaultColor, barFocusColor, selectColor1, selectColor2 } from '../../../constants/Color';
import Config, { ConfigData, InputData } from '../../../config';

const Container = styled.div`
    margin: 30px;
`;

type SortingProps = {
    algo: Algorithms,
    onRun: Function
}

const Sorting: React.FC<SortingProps> = ({ algo, onRun }) => {
    
    let dataset: Dataset | undefined;

    const svgRef = useRef<SVGSVGElement>(null);
    const config = Config[algo];
    
    const [speedPercent, setSpeedPercent] = useState(50);
    const [isRunning, setIsRunning] = useState(false);
    const [data, setData] = useState(new Map<Input, any>());
    const [canExecute, setCanExecute] = useState(false);

    const refresh = () => {
        onRefresh();
        applyInputs(config, dataset!, isRunning, data, setData);
    }

    function onRefresh() {
        data.clear()
        const svg = svgRef.current;
        let n = 0;
        if (isRunning) setIsRunning(false);
        if (inputFieldRef.current != null) {
            const textValue = select(inputFieldRef.current).property('value');
            n = textValue === '' ? 0 : parseInt(textValue);
        }
        dataset = generate(n, config, svg!);
    }

    useEffect(() => {
        refresh();
    }, [svgRef]);

    
    var logScale = d3.scalePow()
    .exponent(7)
    .domain([1, 100])
    .range([0.5, 2000]);

    const title = algo;

    const duration = logScale(101 - speedPercent);

    const inputFieldRef = useRef(null);

    useEffect(() => {
        const execute = checkInputs(config, data);
        setCanExecute(execute)
    }, [data]);

    useEffect(() => {
        refresh();
    }, [algo]);

    const sliderOnChange = function(event : React.ChangeEvent<HTMLInputElement>) {
        setSpeedPercent(parseInt(event.target.value));
    };
 

    return (
        <Container>
            <Title>{title}</Title>
            <MainContent>
                <Svg ref={svgRef}></Svg>
                <SidePanel>
                    { 
                        isRunning 
                        ? <RunningAnimation></RunningAnimation>
                        : 
                            <>
                                <NumberInput label="Number of elements: " ref={inputFieldRef} placeholder={"Default: " + config.dataType} />
                                <RefreshDataButton onClick={e => { refresh();}}>Refresh Data</RefreshDataButton>
                                <SpeedSlider value={speedPercent} type="range" min={1} max={100} defaultValue={speedPercent} onChange={sliderOnChange}/>
                                {canExecute && <RunButton onClick={() => onRun(svgRef.current, setIsRunning, duration, dataset, data)}>Run</RunButton>}
                            </>
                    }
                </SidePanel>
            </MainContent>
        </Container>
    )
};

const applyInputs = (config: ConfigData, dataset: Dataset, isRunning: boolean, data: Map<Input, any>, setData: Function) => {
    const inputs = config.inputs.map(i => i.inputType);

        if (inputs.includes(Input.SELECT_1)) {
            if (!data.has(Input.SELECT_1)) data.set(Input.SELECT_1, null);
            if (inputs.includes(Input.SELECT_2)) {
                if (!data.has(Input.SELECT_2)) data.set(Input.SELECT_2, null);
            }
            const elements = dataset.svgElements;
            for (let i = 0; i < elements.length; i++) {
                const bar = select(elements[i]);
                bar.on('mouseover', () => {
                    if (bar == data.get(Input.SELECT_1)) return;
                    if (bar == data.get(Input.SELECT_2)) return;
                    bar.attr('fill', barFocusColor)
                    bar.style("cursor", "pointer");
                    
                }).on('mouseout', () => {
                    
                    if (bar == data.get(Input.SELECT_1)) return;
                    if (bar == data.get(Input.SELECT_2)) return;

                    bar.attr('fill', barDefaultColor)
                    bar.style("cursor", "default");
                    

                }).on('click', () => {
                    //select(svg).selectAll('rect').attr('fill', barDefaultColor)
                    if (!isRunning) {
                        if (!data.get(Input.SELECT_1)) {
                            bar.attr('fill', selectColor1);
                            data.set(Input.SELECT_1,bar);
                            setData(new Map(data));
                        } else if (inputs.includes(Input.SELECT_2) && data.get(Input.SELECT_1) && !data.get(Input.SELECT_2)) {
                            bar.attr('fill', selectColor2);
                            data.set(Input.SELECT_2,bar);
                            setData(new Map(data));
                        }
                    }
                })
            }
        }
    

    setData(new Map(data))
    
}

const checkInputs = (config: ConfigData, data: Map<Input, any>) => {
    
    const inputs = config.inputs.map(i => i.inputType);

    if (inputs.includes(Input.SELECT_1)) {
        if ((data.has(Input.SELECT_1) && data.get(Input.SELECT_1) == null)) return false;
    }

    if (inputs.includes(Input.SELECT_2)) {
        if ((data.has(Input.SELECT_1) && data.get(Input.SELECT_1) == null)) return false;
        if ((data.has(Input.SELECT_2) && data.get(Input.SELECT_2) == null)) return false;
    }

    return true;
}

export default Sorting;


import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3-selection';
import styled from 'styled-components';
import RunButton from '../Shared/RunButton';
import SpeedSlider from '../Shared/SpeedSlider';
import RunningAnimation from '../Shared/RunningAnimation';
import Svg from '../Shared/Svg';
import * as d3 from 'd3';
import Title from '../Shared/Title';
import MainContent from '../Shared/MainContent';
import InputPanel from '../Shared/InputPanel';
import { Dataset, generate, resize } from '../../visuals/create';
import Input from '../../constants/Input';
import Algorithms from '../../constants/Algorithms';
import { barDefaultColor, barFocusColor, selectColor1, selectColor2 } from '../../constants/Color';
import Config, { ConfigData, InputData } from '../../config';
import { RunInfoType, RunTypeFunction } from '../../constants/Types';
import NumElementsInputs from '../Shared/NumElementsInputs';
import { opacityVariants } from '../../constants/Motion';
import { v4 as uuid } from 'uuid';

const Container = styled.div`
    margin: 20px 30px 30px 30px;

    @media (max-width: 768px) {
        margin: 15px 20px 20px 20px;
    }
`;

type ScreenProps = {
    algo: Algorithms,
    onRun: RunTypeFunction
}

let n = 0;
let runTimer: any = null;
let doit: number;
let dataset: Dataset;

const Screen: React.FC<ScreenProps> = ({ algo, onRun }) => {
    
    

    const svgRef = useRef<SVGSVGElement>(null);
    const config = Config[algo];
    
    const [speedPercent, setSpeedPercent] = useState(50);
    const [runInfo, setRunInfo] = useState({ id: uuid(), isRunning: false, finished: false});
    const [data, setData] = useState(new Map<Input, any>());
    const [errors, setErrors] = useState(new Map());
    const [algoDuration, setAlgoDuration] = useState(0)


    const refresh = (num: number) => {
        n = num;
        setRunInfo({ ...runInfo, finished: false });
        onRefresh(num);
        applyInputs(config, dataset!, runInfo, data, setData);
        setAlgoDuration(0);
    }

    const run = () => {
        
        const id = uuid()
    
        setRunInfo({ id, isRunning: true, finished: false });
        select(svgRef.current).selectAll("*").on('mouseover', null);
        select(svgRef.current).selectAll("*").on('mouseout',null);
        const algoDuration = onRun(svgRef.current, setRunInfo, duration, dataset, data, setAlgoDuration, runInfo);
        setAlgoDuration(algoDuration)
        if (runTimer != null) clearTimeout(runTimer);
        runTimer = setTimeout(() => {
            runTimer = null;
            setRunInfo({ id, isRunning: false, finished: true });
            setAlgoDuration(0)
        }, algoDuration);
    }

    function onRefresh(num: number) {
        data.clear()
        const svg = svgRef.current;
        if (runInfo.isRunning) setRunInfo({ id: uuid(), isRunning: false, finished:  false });
        // if (inputFieldRef.current != null) {
        //     const textValue = select(inputFieldRef.current).property('value');
        //     num = textValue === '' ? 0 : parseInt(textValue);
        // }
        dataset = generate(num, config, svg!);
    }

    useEffect(() => {
        refresh(0);
    }, [svgRef]);
    
    const logScale = d3.scalePow()
    .exponent(7)
    .domain([1, 100])
    .range([0.5, 2000]);

    const title = config.name;

    const duration = logScale(101 - speedPercent)!;

    const inputFieldRef = useRef(null);

    useEffect(() => {
        const errors = checkInputs(config, data);
        setErrors(errors);
    }, [data]);

    useEffect(() => {
        refresh(0);
        
        function resizedw(){
            resize(svgRef.current, config.dataType);
        }
        
        window.onresize = function(){
          clearTimeout(doit);
          doit = setTimeout(resizedw, 1000);
        };
    }, [algo]);

    const sliderOnChange = function(event : React.ChangeEvent<HTMLInputElement>) {
        setSpeedPercent(parseInt(event.target.value));
    };
    
    
    return (
        <>
        <RunningAnimation algoDuration={algoDuration} runInfo={runInfo}/>
        <Container>
            <Title>{title}</Title>
            <MainContent>
                <Svg ref={svgRef}></Svg>
                <InputPanel
                    animate={runInfo.isRunning ? "hidden" : "visible"}
                    variants={opacityVariants}
                    transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
                >
                        <NumElementsInputs dataType={ config.dataType} onClick={refresh}></NumElementsInputs>
                        {/* <NumberInput onChange={refresh} ref={inputFieldRef} placeholder={"(Default): " + config.dataType} /> */}
                        {/* <RefreshDataButton onClick={e => { refresh(0)}}>Refresh Data</RefreshDataButton> */}
                        <SpeedSlider value={speedPercent} type="range" min={1} max={100} defaultValue={speedPercent} onChange={sliderOnChange}/>
                        {<RunButton runInfo={runInfo} errors={errors} onRefresh={() => refresh(n) } onRun={run}>Run</RunButton>}
                </InputPanel>     
            </MainContent>
            </Container>
        </>
    )
};

const applyInputs = (config: ConfigData, dataset: Dataset, runInfo: RunInfoType, data: Map<Input, any>, setData: (x: Map<Input, any>) => void) => {
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
                    if (!runInfo.isRunning) {
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


const checkInputs = (config: ConfigData, data: Map<Input, any>): Map<Input, string> => {
    
    const errors: Map<Input, string> = new Map();
    
    for (const input of config.inputs) {
        if (input.inputType == Input.SELECT_1) {
            if ((data.has(Input.SELECT_1) && data.get(Input.SELECT_1) == null)) errors.set(Input.SELECT_1, input.error);
        }
        else if (input.inputType == Input.SELECT_2) {
            if ((data.has(Input.SELECT_2) && data.get(Input.SELECT_2) == null)) errors.set(Input.SELECT_2, input.error);
        }
    }

    return errors;
}

export default Screen;


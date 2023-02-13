import React, { useRef, useEffect } from 'react';
import styled from'styled-components';
import { select } from 'd3-selection';
import { easeLinear, easeSinInOut } from 'd3';
import { motion } from 'framer-motion'
import { opacityVariants } from '../../../constants/Motion';
import { RunInfoType } from '../../../constants/Types';

const height = 5;
const width = window.innerWidth;

const Container = styled(motion.div)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed; 
    bottom:0;
    margin: 0;
`;

const Svg = styled.svg`
    height:${height}px;
    width:${width}px;
`;

interface RunningAnimationProps {
    runInfo: RunInfoType,
    algoDuration: number
}
let square: d3.Selection<any, unknown, null, undefined> | null = null;

const RunningAnimation: React.FC<RunningAnimationProps> = ({ runInfo, algoDuration }) => {

    const svgRef = useRef<SVGSVGElement>(null);
    
    useEffect(() => {
        const svg = svgRef.current;
        // select(svg)
        //     .append('text')
        //     .attr('fill', 'white')
        //     .style('font-size', '24px')
        //     .style('text-transform', 'uppercase')
        //     .style('font-family', 'Roboto')
        //     .style('letter-spacing', '1.5px')
        //     .attr('x', (width/2) - 60)
        //     .attr('y', height/2)
        //     .text('Running')
        
        select(svg).style('width', window.innerWidth);
        
        if (square == null && algoDuration != 0) {
            
            select(svg).selectAll('rect').interrupt();
            select(svg).selectAll('*').remove();

            square = select(svg)
                .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 0)
                .attr('height', height)
                .attr('fill', 'white');
            
            const randomColor = () => {
                return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
            }
            
            
            const animate = () => {
                if (square != null && algoDuration != 0) {
                    square
                    .transition('width-expand')
                    .ease(easeLinear)
                    .attr('width', window.innerWidth)
                    .duration(algoDuration)
                }
            }
            
            const animateColor = () => {
                if (square != null && algoDuration != 0) {
                    square
                    .transition('animate-color')
                    .ease(easeSinInOut)
                    .attr('fill', randomColor())
                    .duration(1000)
                    .transition()
                    .ease(easeSinInOut)
                    .attr('fill', randomColor())
                    .duration(1000)
                    .on('end', animateColor)
                    
                }
                
            }
            
            animateColor();
            animate();
        } else {
            square?.interrupt();
            square?.remove()
            square = null;
        }
        

    },[algoDuration]);
    
    return (
        <Container
            animate={runInfo.isRunning ? "visible" : "hidden"}
            variants={opacityVariants}
        >
            <Svg ref={svgRef}></Svg>
        </Container>
    )

}

export default RunningAnimation;
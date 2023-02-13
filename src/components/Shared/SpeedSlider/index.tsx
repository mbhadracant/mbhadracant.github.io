import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { MARGIN } from '../../../constants/Values';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    margin: 20px;
    width:150px;
    font-size:15px;
    text-transform:uppercase;
    transition: all 0.3s ease 0s;

    @media (max-width: 768px) {
        width:75px;
        font-size:10px;
    }
`;

const Label = styled.span`
    color: white;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const SliderInput = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 7px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    margin:15px 0px;
    transition: all 0.3s ease 0s;

    &:hover {
        opacity: 1;
        box-shadow: 0px 0px 5px 5px rgba(46, 229, 157, 0.1);
        cursor: pointer;
    }

    

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: #4CAF50;
        cursor: pointer;

        @media (max-width: 768px) {
            width: 13px;
            height: 13px;
        }


    }

    &::-webkit-slider-thumb:active {
        background: #027042;
    }
`;

interface SpeedSliderProps {
    ref: React.RefObject<HTMLInputElement>,
    defaultValue: number,
    value: number,
    type: string,
    min: number,
    max: number,
    onChange: (num: React.ChangeEvent<HTMLInputElement>) => void
}

const SpeedSlider = forwardRef<HTMLInputElement, SpeedSliderProps>(
    ({ defaultValue, value, type, min, max, onChange}, ref) => (
        <Container>
                <Label>Speed</Label>
                <SliderInput 
                    defaultValue={defaultValue}
                    ref={ref}
                    type={type}
                    min={min}
                    max={max}
                    step={1}
                    onChange={e => onChange(e)}
                />
                <Label>{value}%</Label>
        </Container>
    )
  );


export default SpeedSlider;
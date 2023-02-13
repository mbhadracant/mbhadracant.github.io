import styled from "styled-components";
import React, { useState } from 'react';
import Input from "../../../constants/Input";
import { map } from "d3";
import { FaMousePointer } from 'react-icons/fa'
import { barDefaultColor } from "../../../constants/Color";
import { RunInfoType } from "../../../constants/Types";
const Container = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const Button = styled.div.attrs((props: { hoverColor: string, bgColor: string }) => props)`
    width: 120px;
    height: 40px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 1000;
    color: white;
    background-color: ${(props) => props.bgColor};
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    text-align:center;
    line-height: 40px;
    
    @media (max-width: 768px) {
        font-size: 8px;
        width: 60px;
        height: 30px;
        line-height:30px;
    }

    &:hover {
        background-color: ${(props) => props.hoverColor};
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.1);
        color: white;
        transform: translateY(-7px);
    }

    &:active {
        background-color: ${(props) => props.hoverColor};
    }
`

const ErrorContainer = styled.div.attrs((props: { errorsLength: number }) => props)`
    position:absolute;
    margin-bottom: ${(props) => props.errorsLength * 100}px;
    transition: all 0.3s ease 0s;
    background:rgba(0,0,0,0.9);
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;

    @media (max-width: 768px) {
        margin-bottom:${(props) => props.errorsLength * (75)}px;
    }
`

const ErrorListItem = styled.span`
    color:white;
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    text-align:center;
    padding:15px;
    border-radius: 50px;
    
    @media (max-width: 768px) {
        font-size: 10px;
        padding:10px;
    }
`

const PointerIcon = styled(FaMousePointer)`
    color: ${barDefaultColor};
    margin-right: 10px;
`

interface RunButtonProps {
    onRun: () => void,
    onRefresh: () => void,
    errors: Map<Input, string>,
    runInfo: RunInfoType
}

const RunButton: React.FC<RunButtonProps> = ({ errors, runInfo, onRun, onRefresh}) => {
    const [style, setStyle] = useState({ opacity: '0', display: 'none' });
    
    let hoverColor = (errors.size == 0) ? '#205303' : '#942101';
    let bgColor = (errors.size == 0) ? '#2ac989' : '#d90000';

    const errorTexts = []

    for (const error of Array.from(errors.values())){
        errorTexts.push(error);
    }

    const text = runInfo.finished ? 'REFRESH' : 'RUN'

    hoverColor = (runInfo.finished) ? '#02acdb' : hoverColor;
    bgColor = (runInfo.finished) ? '#0282a6' : bgColor;

    const onClick = runInfo.finished ? onRefresh : onRun;

    return (
      <>
            <Container>
                <ErrorContainer errorsLength={ errors.size } style={style}>
                    {errorTexts.map(e => <ErrorListItem><PointerIcon/>{e}</ErrorListItem>)}
                </ErrorContainer>
                <Button hoverColor={hoverColor} bgColor={bgColor} onClick={() => { if (errors.size == 0) onClick() }}
                    onMouseEnter={e => {
                        setStyle({opacity: '1', display: 'flex'});
                    }}
                    onMouseLeave={e => {
                        setStyle({opacity: '0', display: 'none'})
                    }}
                >
                    {text}
                </Button>
        </Container>
      </>
    )
  };
  



export default RunButton;
import React, { useState } from 'react';
import NavBar from '../../NavBar';
import Algorithms from '../../../constants/Algorithms';
import Screen from '../../Screen';
import Config from '../../../config';
import styled from 'styled-components';
import DataType, { getInputNumElements } from '../../../constants/DataType';


const Container = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const Button = styled.button`
    background-color: rgba(50, 102, 168, 0.9);
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    height:auto;
    display:inline;
    margin-right: 10px;
    width:50px;

    cursor: pointer;

    transition: all 0.3s ease 0s;
    @media (max-width: 768px) {
      font-size: 12px;
      width:35px;
      padding:5px;
    }

    &:hover {
      background:rgba(50, 102, 168, 0.3);
    }
`;

const Label = styled.span`
    position:absolute;
    color:white;
    margin-top:-75px;
    letter-spacing: 2px;
    font-size: 16px;

    transition: all 0.3s ease 0s;
    @media (max-width: 768px) {
      font-size: 12px;
      margin-top:-60px;
    }

`;

interface NumElementsInputs {
  onClick: (n: number) => void,
  dataType: DataType
}


const NumElementsInputs: React.FC<NumElementsInputs> = ({ onClick, dataType }) => {
  
  const elementsNumList = getInputNumElements(dataType);

  return (
    <>
      <Container>
        <Label>NUM ELEMENTS</Label>
        {elementsNumList.map(i => <Button key={i} onClick={() => onClick(i)}>{i}</Button>)}
      </Container>
    </>
  )
};



export default NumElementsInputs;

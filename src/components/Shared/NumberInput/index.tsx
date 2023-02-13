import React, { forwardRef } from 'react';
import styled from "styled-components";
import { MARGIN } from '../../../constants/Values';

const Label = styled.span`
    color: white;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const InputField = styled.div`
    margin: ${MARGIN/3}px;
    display: flex;
    flex-direction: row;
`;

const Input = styled.input`
    width:150px;
    border: 0;
    outline: 0;
    padding: ${MARGIN/3}px 0;
    border-bottom: 2px solid white;
    margin-left:10px;
    box-shadow: none;
    color: #111;
    background:none;
    color: white;
    letter-spacing: 1px;
`;

interface NumberInputProps {
    ref: React.RefObject<HTMLInputElement>,
    placeholder: string,
    onChange: (n: number) => void
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({placeholder, onChange}, ref) => (
        <InputField>
            <Input ref={ref} placeholder={placeholder} type="number" onChange={() => onChange(0)}/>
        </InputField>
    )
  );

export default NumberInput;
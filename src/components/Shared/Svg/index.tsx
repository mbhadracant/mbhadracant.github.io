import React from 'react';
import styled from "styled-components"
import { SVG_HEIGHT, SVG_WIDTH } from "../../../constants/Values";

const Svg = styled.svg`
    height:${SVG_HEIGHT}px;
    width:auto;
    background:rgba(255,255,255, 0.05);
`;


const Container = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* aspect ratio */
    vertical-align: top;
    overflow: hidden;
`

export default Svg;
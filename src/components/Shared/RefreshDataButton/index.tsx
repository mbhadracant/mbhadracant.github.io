import styled from "styled-components";

const RefreshDataButton = styled.button`
    width: 120px;
    height: 45px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: white;
    background-color: #0079c4;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    margin: 10px 0;


    &:hover {
        background-color: #024f7f;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.1);
        color: white;
        transform: translateY(-7px);
    }

    &:active {
        background-color: #024f7f;
    }
`;

export default RefreshDataButton;
import styled from "styled-components";

const Title = styled.span`
    display: block;
    font-size:26px;
    font-weight: 400;
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 500;
    transition: all 0.3s ease 0s;

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export default Title;
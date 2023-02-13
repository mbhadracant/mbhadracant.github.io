import styled from "styled-components";
import { motion } from "framer-motion";

const InputPanel = styled(motion.div)`
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    display: flex;
    flex-direction: row;
    margin-top:10px;
    margin-bottom:10px;
    align-items: center;
    justify-content: center;
`;

export default InputPanel;
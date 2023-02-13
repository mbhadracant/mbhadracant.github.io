import React from 'react';
import styled from 'styled-components';
import NavBarItem from './NavBarItem';
import NavigationData from '../../constants/NavigationData';
import Algorithms from '../../constants/Algorithms';
import { MARGIN } from '../../constants/Values';

const Container = styled.div`
    background-color: rgba(0,0,0, 0.2);
    display: flex;
    flex-direction: row;
`;

const Title = styled.span`
    color: white;
    display:block;
    padding: ${MARGIN/3}px;
    font-weight: bold;
    margin-left:${MARGIN}px;
    letter-spacing: 1px;
    text-transform: uppercase;
    
    transition: all 0.3s ease 0s;

    @media (max-width: 768px) {
        font-size: 10px;
    }
`;

type NavBarProps = {
    setAlgo: React.Dispatch<React.SetStateAction<Algorithms>>
}

const NavBar : React.FC<NavBarProps> = ({ setAlgo }) => (
  <Container>
      <Title>Algorithms Visualization</Title>
      {
          NavigationData.map(data => <NavBarItem key={data.name} setAlgo={setAlgo} title={data.name} subTitles={data.children}/>)
      }
  </Container>
);

export default NavBar;
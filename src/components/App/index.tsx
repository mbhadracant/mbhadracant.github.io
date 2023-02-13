import React, { useState } from 'react';
import NavBar from '../NavBar';
import Algorithms from '../../constants/Algorithms';
import Screen from '../Screen';
import Config from '../../config';
import styled from 'styled-components';



const App : React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(Algorithms.BFS_BINARY_TREE);
  const config = Config[selectedAlgorithm];

  const run = config.onRun;
  return (
    <>
      <Container>
        <NavBar setAlgo={setSelectedAlgorithm}/>
        <Screen algo={selectedAlgorithm} onRun={run} />,
      </Container>
    </>
  )
};

const Container = styled.div`
  margin: 0; height: 100%; overflow: hidden
`;
export default App;

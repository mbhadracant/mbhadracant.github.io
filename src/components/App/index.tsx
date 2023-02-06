import React, { useState } from 'react';
import NavBar from '../NavBar';
import Algorithms from '../../constants/Algorithms';
import Sorting from '../Category/Sorting';
import Config from '../../config';



const App : React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(Algorithms.DEPTH_FIRST_SEARCH);
  const config = Config[selectedAlgorithm];

  const run = config.onRun;
  return (
    <>
      <NavBar setAlgo={setSelectedAlgorithm}/>
      <Sorting algo={selectedAlgorithm} onRun={run} />,
    </>
  )
};

export default App;

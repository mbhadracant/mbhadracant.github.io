import { Dataset } from '../visuals/create';
import Input from './Input';

type RunTypeFunction = (
  svg: SVGSVGElement | null,
  isRunning: React.Dispatch<React.SetStateAction<RunInfoType>>,
  duration: number,
  dataset: Dataset,
  data: Map<Input, any>,
  setAlgoDuration: React.Dispatch<React.SetStateAction<number>>,
  runInfo: RunInfoType
) => number

type RunInfoType = {
  id: string;
  isRunning: boolean;
  finished: boolean;
}

export type { RunTypeFunction, RunInfoType }
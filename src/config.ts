import Algorithms from "./constants/Algorithms";
import Input from "./constants/Input";
import DataType from "./constants/DataType";
import BubbleSort from "./d3-helper/Animation/BubbleSort";
import SelectionSort from "./d3-helper/Animation/SelectionSort";
import InsertionSort from "./d3-helper/Animation/InsertionSort";
import MergeSort from "./d3-helper/Animation/MergeSort";
import QuickSort from "./d3-helper/Animation/QuickSort";
import BinarySearch from "./d3-helper/Animation/BinarySearch";
import BFS from "./d3-helper/Animation/BFS";
import DFS from "./d3-helper/Animation/DFS";

export interface InputData {
  inputType: Input,
  error: string,
  required: boolean
}

export interface ConfigData {
  algo: Algorithms,
  name: string,
  dataType: DataType,
  inputs: InputData[],
  onRun: Function
}

type ConfigType = {
  [key in Algorithms]: ConfigData
;
}

const Config: ConfigType = {
  [Algorithms.BUBBLE_SORT]: {algo: Algorithms.BUBBLE_SORT, name: 'Bubble Sort', dataType: DataType.BAR, inputs: [], onRun: BubbleSort},
  [Algorithms.SELECTION_SORT]: {algo: Algorithms.SELECTION_SORT, name: 'Selection Sort', dataType: DataType.BAR, inputs: [], onRun: SelectionSort},
  [Algorithms.INSERTION_SORT]: {algo: Algorithms.INSERTION_SORT, name: 'Insertion Sort', dataType: DataType.BAR, inputs: [], onRun: InsertionSort},
  [Algorithms.MERGE_SORT]: {algo: Algorithms.MERGE_SORT, name: 'Merge Sort', dataType: DataType.BAR, inputs: [], onRun: MergeSort},
  [Algorithms.QUICK_SORT]: {algo: Algorithms.QUICK_SORT, name: 'Quick Sort', dataType: DataType.BAR, inputs: [], onRun: QuickSort},
  [Algorithms.BINARY_SEARCH]: {
    algo: Algorithms.BINARY_SEARCH, name: 'Binary Search', onRun: BinarySearch, dataType: DataType.BAR,
    inputs: [{ inputType: Input.SELECT_1, error: 'Please select a bar to search for', required: true }]
  },
  [Algorithms.DEPTH_FIRST_SEARCH]: {
    algo: Algorithms.DEPTH_FIRST_SEARCH, name: 'DFS (Depth First Search)', dataType: DataType.MATRIX,
    inputs: [
      { inputType: Input.SELECT_1, error: 'Please select a start node', required: true },
      { inputType: Input.SELECT_2, error: 'Please select a end a node', required: true },
    ], onRun: DFS},
  [Algorithms.BREADTH_FIRST_SEARCH]: {
    algo: Algorithms.BREADTH_FIRST_SEARCH, name: 'BFS (Bredth First Search)', dataType: DataType.MATRIX,
    inputs: [
      { inputType: Input.SELECT_1, error: 'Please select a start node', required: true },
      { inputType: Input.SELECT_2, error: 'Please select a end a node', required: true },],
    onRun: BFS
  },
}

export default Config;
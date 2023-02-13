import Algorithms from "./constants/Algorithms";
import Input from "./constants/Input";
import DataType from "./constants/DataType";
import BubbleSort from "./visuals/algo-animations/BubbleSort";
import SelectionSort from "./visuals/algo-animations/SelectionSort";
import InsertionSort from "./visuals/algo-animations/InsertionSort";
import MergeSort from "./visuals/algo-animations/MergeSort";
import QuickSort from "./visuals/algo-animations/QuickSort";
import BinarySearch from "./visuals/algo-animations/BinarySearch";
import BFS from "./visuals/algo-animations/MatrixBFS";
import DFS from "./visuals/algo-animations/MatrixDFS";
import { RunTypeFunction } from "./constants/Types";
import RadixSort from "./visuals/algo-animations/RadixSort";
import BinaryTreeBFS from "./visuals/algo-animations/BinaryTreeBFS";

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
  onRun: RunTypeFunction
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
  [Algorithms.QUICK_SORT]: { algo: Algorithms.QUICK_SORT, name: 'Quick Sort', dataType: DataType.BAR, inputs: [], onRun: QuickSort },
  [Algorithms.RADIX_SORT]: {algo: Algorithms.RADIX_SORT, name: 'Radix Sort', dataType: DataType.ARRAY, inputs: [], onRun: RadixSort},
  [Algorithms.BINARY_SEARCH]: {
    algo: Algorithms.BINARY_SEARCH, name: 'Binary Search', onRun: BinarySearch, dataType: DataType.BAR,
    inputs: [{ inputType: Input.SELECT_1, error: 'Select a bar to search on', required: true }]
  },
  [Algorithms.DFS_MATRIX]: {
    algo: Algorithms.DFS_MATRIX, name: 'DFS (Matrix)', dataType: DataType.MATRIX,
    inputs: [
      { inputType: Input.SELECT_1, error: 'Select a start node', required: true },
      { inputType: Input.SELECT_2, error: 'Select a end node', required: true },
    ], onRun: DFS},
  [Algorithms.BFS_MATRIX]: {
    algo: Algorithms.BFS_MATRIX, name: 'BFS (Matrix)', dataType: DataType.MATRIX,
    inputs: [
      { inputType: Input.SELECT_1, error: 'Select a start node', required: true },
      { inputType: Input.SELECT_2, error: 'Select a end node', required: true },],
    onRun: BFS
  },
  [Algorithms.BFS_BINARY_TREE]: {
    algo: Algorithms.BFS_MATRIX, name: 'BFS (Binary Tree)', dataType: DataType.BINARY_TREE,
    inputs: [],
    onRun: BinaryTreeBFS
  },
}

export default Config;
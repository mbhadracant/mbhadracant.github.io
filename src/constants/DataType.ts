enum DataType {
  BAR, MATRIX, GRAPH, ARRAY, BINARY_TREE
}


const getInputNumElements = (dataType: DataType): number[] => {
  switch (dataType) {
    case DataType.BAR:
      return [10, 50, 100, 200];
    case DataType.MATRIX:
      return [5, 10, 20, 50];
    case DataType.GRAPH:
      return [5, 10, 20, 50];
    case DataType.ARRAY:
      return [5, 10, 15, 20];
    case DataType.BINARY_TREE:
      return [15, 31, 63, 127];
  }
}

const getDefaultElements = (dataType: DataType): number => {
  switch (dataType) {
    case DataType.BAR:
      return 50;
    case DataType.MATRIX:
      return 10;
    case DataType.GRAPH:
      return 10;
    case DataType.ARRAY:
      return 10;
    case DataType.BINARY_TREE:
      return 31;
  }
}

export { getInputNumElements, getDefaultElements };
  
export default DataType;
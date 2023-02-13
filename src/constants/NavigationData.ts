import Algorithms from "./Algorithms";

const NavigationData = [
    { name: 'Sorting', children: [
        Algorithms.BUBBLE_SORT,
        Algorithms.SELECTION_SORT,
        Algorithms.INSERTION_SORT,
        Algorithms.MERGE_SORT,
        Algorithms.QUICK_SORT,
        Algorithms.RADIX_SORT
    ]},
    { name: 'Search', children: [Algorithms.BINARY_SEARCH, Algorithms.BFS_MATRIX, Algorithms.DFS_MATRIX, Algorithms.BFS_BINARY_TREE]}
]

export default NavigationData;
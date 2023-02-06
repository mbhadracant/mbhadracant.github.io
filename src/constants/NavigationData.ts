import Algorithms from "./Algorithms";

const NavigationData = [
    { name: 'Sorting', children: [
        Algorithms.BUBBLE_SORT,
        Algorithms.SELECTION_SORT,
        Algorithms.INSERTION_SORT,
        Algorithms.MERGE_SORT,
        Algorithms.QUICK_SORT
    ]},
    { name: 'Search', children: [Algorithms.BINARY_SEARCH, Algorithms.BREADTH_FIRST_SEARCH, Algorithms.DEPTH_FIRST_SEARCH]}
]

export default NavigationData;
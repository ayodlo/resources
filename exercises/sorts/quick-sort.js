// worst case is o (n^2) time complexity but averages o (n log(n))
// need to ensure pivot is a 'good' pivot point, if the pivot is the smallest numbers in an already ordered list this will take a long time
// o(log(n)) space complexity
// unstable algorithm - meaning if keys for sorting are the same, they MAY NOT maintain the same order as they were in the inpui

function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    
    const pivot = array[array.length -1];
    const leftArr = [];
    const rightArr = [];
    for(const el of array.slice(0, array.length - 1)) {
        el < pivot ? leftArr.push(el) : rightArr.push(el)
    }
    // Spreading out the values of the returned array
    // Without the Spread operator we would get nested arrays
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]
}

const numbers = [99, 44, 6, 2, 1, 1000, 203, 5, 63, 87, 283, 4, 0];
console.log(quickSort(numbers));
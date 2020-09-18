// o (n log n) time complexity & o(n) space complexity
// stable algorithm - meaning if keys for sorting are the same
// they will maintain the same order as they were in the input
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0, 22];

function mergeSort (array) {
  if (array.length === 1) {
    return array
  }
  // Split Array in into right and left
  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle) 
  const right = array.slice(middle)

  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

function merge(left, right){
  const result = [];
  while ((left.length > 0) && (right.length > 0)) {
      left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
  }  
  return [...result, ...left.slice(), ...right.slice()]
}

console.log(mergeSort(numbers));
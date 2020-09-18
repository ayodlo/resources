// SORT SELECTION #1
// REMEMBER, SELCTION SORT MAKES SURE SMALLEST NUMBER ENDS UP FIRST AFTER EACH ITERATION
// O(n^2) - NOT THAT GOOD
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(numbers) {
length = numbers.length;

  for (i=0; i<length; i++) {
    for (j=i+1; j<length; j++) {
      if (numbers[i] > numbers[j]) {
        let temp = numbers[j];
        numbers[j] = numbers[i];
        numbers[i] = temp;
      }
    }
  }
  console.log(numbers)
}

selectionSort(numbers);


// SORT SELCTION #2
const numbers2 = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort2(array) {
  const length = array.length;
  for(let i = 0; i < length; i++){
    // set current index as minimum
    let min = i;
    let temp = array[i];
    for(let j = i+1; j < length; j++){
      if (array[j] < array[min]){
        //update minimum if current is lower that what we had previously
        min = j;
      }
    }
    array[i] = array[min];
    array[min] = temp;
  }
  return array;
}

//selectionSort2(numbers2);
//console.log(numbers2);
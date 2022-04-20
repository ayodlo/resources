/*Sort using .sort on arrays*/
// Sort will convert elements from the array to strings and then compare their sequnces of UTF-16 code unit values

// Strings
const names = ['Florida', 'Liam', 'Jai', 'Ivan'];
names.sort(); // note this will sort in ascending order (from a to z for strings)

// Numbers
// numbers.sort will not work because the numbers are converted to strings which will check for the utf-16 values
// we can provide a compare function to sort which will determine how to sort
const numbers = [74, 18, 10, 5, 84, 24, 105];
function compareFunction(a, b) {
  // we have 3 outcome scenarios
  // if the return of this function is less than 0 then a will come first ( return < 0)
  // if the return of this function is greater than 0 then b will come first ( return < 0)
  // if the return of this function is 0 then nothing will be changed
  // we can make this work with numbers by saying:
  // note this will sort in ascending order (from negative to positive for numbers)
  // to put in decsending order swap a with be in the return (b.price - a.price)
  return a - b;
}
// provide the compareFunction as a callback function for the sort method
numbers.sort(compareFunction);

// Array of Objects
const products = [
  {
    name: 'laptop',
    price: 1000,
  },
  {
    name: 'dekstop',
    price: 1500,
  },
  {
    name: 'phone',
    price: 500,
  },
];

products.sort((a, b) => {
  // to put in decsending order swap a with be in the return (b.price - a.price)
  return a.price - b.price;
});

/*Flatten an Array*/
var flattenedArray = [];
var coloursArray = [
 [“blue”, “green”],
 [“green”, “black”, “orange”, “blue”],
 [“green”, “red”]
 ]
flattenedArray = coloursArray.reduce( (total, subArray)=>{
 return total.concat(subArray)
},[]);
console.log(flattenedArray)
["blue", "green", "green", "black", "orange", "blue", "green", "red"]

/*Unique Items in Array*/
var array = [“blue”, “green”, “green”, “black”, “orange”, “blue”, “green”, “red”];
var uniqueArray = [];
uniqueArray = array.filter((element, index, array)=>{
 return array.indexOf(element) === index;
})
console.log(uniqueArray)
["blue", "green", "black", "orange", "red"]

/*Helper Functions for Solutions*/
function getColoursFromArray(array){
  return array.map( e =>{
    return typeof e.colours !== ‘undefined’ && e.colours
  })
 }
 function flattenArray(array){
  return array.reduce((total, next)=>{
    return total.concat(next)
  },[])
 }
 function getUniqueItems(array){
  return array.filter((e, i, self)=>{
    return self.indexOf(e) === i
  });
 }
 var pipeline = [getColoursFromArray, flattenArray, getUniqueItems]
 var result = pipeline.reduce( (total, func)=>{
  return func(total)
 },data)
 console.log(result)
 ["blue", "green", "black", "orange", "red"]

 /*Two Number Sum*/
 // Createa function that takes an array and a target sum and find if two numbers in the array equal the target sum
 // Return the two unumbers that do in an array

 // Solution 3
 // O(n^2) time | O(1) space
 function twoNumberSum(array, targetSum) {
	for(let i = 0; i < array.length - 1; i++) {
		const firstNum = array[i];
		for (let j = i + 1; j < array.length; j++) {
			const secondNum = array[j];
			if(firstNum + secondNum === targetSum) {
			  return [firstNum, secondNum]		
			}
		}
	}
	return []
}

// Solution 2
// O(n) time | O(n) space
function twoNumberSum(array, targetSum) {
  const nums = {};
	for (const num of array) {
		const potentialMatch = targetSum - num;
		if (potentialMatch in nums) {
			return [potentialMatch, num];
		} else {
			nums[num] = true;
		}
	}
	return [];
}

// Solution 1
// O(nlog(n)) time | O(1) space
function twoNumberSum(array, targetSum) {
  array.sort((a,b) => a - b);
	let left = 0;
	let right = array.length - 1;
	while(left < right) {
		const currentSum = array[left] + array[right];
		if(currentSum === targetSum) {
			return [array[left], array[right]]
		} else if (currentSum < targetSum) {
			left++;
		} else if (currentSum > targetSum) {
			right--;
		}
	}
	return [];
}

/*Unique Objects from Array of Objects*/
// Creates an array of objects with unique "name" property values
// We chose 'name' to be the unique identifier here
let uniqueObjArray = [
  ...new Map(myObjArray.map((item) => [item['name'], item])).values(),
];

const myObjArray = [
  {
    name: 'Eva Devore',
    character: 'Evandra',
    episodes: 15,
  },
  {
    name: 'Alessia Medina',
    character: 'Nixie',
    episodes: 15,
  },
  {
    name: 'Kendall Drury',
    character: 'DM',
    episodes: 15,
  },
  {
    name: 'Thomas Taufan',
    character: 'Antrius',
    episodes: 14,
  },
  {
    name: 'Alessia Medina',
    character: 'Nixie',
    episodes: 15,
  },
];

// .map
// In the example above we want to create a unique array of objects based on the 'name' property of each object.
// We can also change the key to either 'character' or 'episode' property'
// When the distinct array of objects is created it will set the last duplicate object as the object value. Why? Because the script will essentially reassign the ‘name’ property each time it loops through the array when creating the new map.
// the callback in our .map function rebuilds each array to make a sub-array containing the value of each name key in the array as the zeroeth element and the object at the first element
[item['name'], item];
// first element looks like
['Eva Devore', { name: 'Eva Devore', character: 'Evandra', episodes: 15 }];

// new Map
// Map process on 2d Array
// the Map object stores key-value pairs similar to an Object. However, the Map maintains the insertion order of the properties
// Map can be iterated through in a similar way to a 2d array with the zeroeth element as a key and the next element as a value for each property of the map
let valuesObject = new Map([
  ['key_one', 'val_one'],
  ['key_two', 'val_two'],
  ['key_three', 'val_three'],
]);
console.log('valuesObject', valuesObject);

// LOGS: valuesObject Map {
//   'key_one' => 'val_one',
//   'key_two' => 'val_two',
//   'key_three' => 'val_three'
// }

// EXAMPLE WITH OUR DATA FRO .map
// PREVIOUS LOG: test_uniqueObjArray_map
// [
//     ["Eva Devore", { name: "Eva Devore", character: "Evandra", episodes: 15 }],
//     ["Alessia Medina",{ name: "Alessia Medina", character: "Nixie", episodes: 15 }],
//     ["Kendall Drury", { name: "Kendall Drury", character: "DM", episodes: 15 }],
//     ["Thomas Taufan", { name: "Thomas Taufan", character: "Antrius", episodes: 14 }],
//     ["Alessia Medina",{ name: "Alessia Medina", character: "Nixie", episodes: 15 }]
// ];

// Create a new Map from our mapped data.
let test_uniqueObjArray_NewMap = new Map(test_uniqueObjArray_map);

// Here we simply apply new Map to this array of data. By doing this Map turns into a type of Object with a key-value pair. Now keep in mind that Object keys are the highlander of data types – there can be only one (keys must be unique!)
// All of our keys are now the names of our users. The new Map constructor process will then iterate through each name and store it and then assign its value. If a key already exists it will overwrite it with this next value with the same key name.
// LOGS: test_uniqueObjArray_NewMap Map {
//   'Eva Devore' => { name: 'Eva Devore', character: 'Evandra', episodes: 15 },
//   'Alessia Medina' => { name: 'Alessia Medina', character: 'Nixie', episodes: 15 },
//   'Kendall Drury' => { name: 'Kendall Drury', character: 'DM', episodes: 15 },
//   'Thomas Taufan' => { name: 'Thomas Taufan', character: 'Antrius', episodes: 14 }
// }

// keys() and values() method
// We can generate iterators to go through each key or value with the keys() and values() methods respectively.
// PREVIOUS LOG: test_uniqueObjArray_NewMap Map {
//   'Eva Devore' => { name: 'Eva Devore', character: 'Evandra', episodes: 15 },
//   'Alessia Medina' => { name: 'Alessia Medina', character: 'Nixie', episodes: 15 },
//   'Kendall Drury' => { name: 'Kendall Drury', character: 'DM', episodes: 15 },
//   'Thomas Taufan' => { name: 'Thomas Taufan', character: 'Antrius', episodes: 14 }
// }

let test_uniqueObjArray_NewMap_values = test_uniqueObjArray_NewMap.values();
console.log(
  'test_uniqueObjArray_NewMap_values',
  test_uniqueObjArray_NewMap_values
);

// LOGS: test_uniqueObjArray_NewMap_values [Map Iterator] {
//   { name: 'Eva Devore', character: 'Evandra', episodes: 15 },
//   { name: 'Alessia Medina', character: 'Nixie', episodes: 15 },
//   { name: 'Kendall Drury', character: 'DM', episodes: 15 },
//   { name: 'Thomas Taufan', character: 'Antrius', episodes: 14 }
// }

// Spreading Values
// When you apply the spread syntax on an array, it will add each item of an iterable to the array. Take a look at what it does to our Map values
// PREVIOUS LOG: test_uniqueObjArray_NewMap_values [Map Iterator] {
//   { name: 'Eva Devore', character: 'Evandra', episodes: 15 },
//   { name: 'Alessia Medina', character: 'Nixie', episodes: 15 },
//   { name: 'Kendall Drury', character: 'DM', episodes: 15 },
//   { name: 'Thomas Taufan', character: 'Antrius', episodes: 14 }
// }

let test_uniqueObjArray_NewMap_values_asArray = [
  ...test_uniqueObjArray_NewMap_values,
];

// LOGS: test_uniqueObjArray_NewMap_values_asArray [
//   { name: 'Eva Devore', character: 'Evandra', episodes: 15 },
//   { name: 'Alessia Medina', character: 'Nixie', episodes: 15 },
//   { name: 'Kendall Drury', character: 'DM', episodes: 15 },
//   { name: 'Thomas Taufan', character: 'Antrius', episodes: 14 }
// ]

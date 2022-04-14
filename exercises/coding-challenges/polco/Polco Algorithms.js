import './styles.css';

export default function App() {
  /****************************************/

  // Detect if two arrays have all the same elements

  const same1 = ['hello', 'world', 'test', 'test', 'word'];
  const same2 = ['world', 'hello', 'test', 'test', 'word'];
  const different = ['hello', 'world', 'test', 'word'];
  const different2 = ['hello', 'world', 'test', 'word', 'something else'];

  const arraysAreIdentical = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    let array1Count = {};
    let array2Count = {};

    arr1.forEach((val) => {
      if (!array1Count[val]) {
        array1Count[val] = 1;
      } else {
        array1Count[val]++;
      }
    });

    arr2.forEach((val) => {
      if (!array2Count[val]) {
        array2Count[val] = 1;
      } else {
        array2Count[val]++;
      }
    });

    console.log('a', array1Count);

    for (let word in array1Count) {
      if (array1Count[word] !== array2Count[word]) return false;
    }
    return true;
  };

  console.log('should be true', arraysAreIdentical(same1, same2)); // should return true
  console.log('should be false 1', arraysAreIdentical(same1, different)); // should return false
  console.log('should be false 2', arraysAreIdentical(same1, different2)); // should return false

  // Detect duplicates in sorted array,

  // const array1 = [4, 6, 9, 9, 20, 50, 50, 101, 101, 101, 101];
  // const array2 = [100, 200, 300, 400];

  const findDuplicates = (array) => {
    //CODE HERE
  };

  // console.log(findDuplicates(array1)); // expect [9, 50, 101]
  // console.log(findDuplicates(array2)); // expect []

  return null;
}

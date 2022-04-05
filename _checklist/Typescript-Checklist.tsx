/*Types
number
string
boolean
objects and nested objects
arrays
tuples
unions
literals
*/

//TypeScript will INFRER the types if a value is provided when initializing the object or var so don't explicitly infer unless we aren't initializing the var with a value
//DECLARTING
//variables only that don't have initialized state
let myNumber: number;
let myString: string;

//inside functions
function myFunction(myNumber: number, myString: string) {
  return myNumber + myString;
}

//objects - note it's not good practice to explcitly define the types as we do below because TypeScript will INFRER the types if a value is provided when initializing the object or var
const personOne: {
  name: string;
  age: number;
} = {
  name: 'Devon',
  age: 30,
};

//nested objects
const product: {
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  };
} = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!',
  },
};

//tuples
const personTwo: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //notice we are explicitly defining that this array has two items first one being number and second string - array.push() is the only exception to this rule
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author'],
};

//enums - enums will by default receive the number 0 and increment for each value after by one - note we can define the value we want for any of our enums as below
//enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases.
enum Role {
  ADMIN,
  READ_ONLY = 100,
  AUTHOR = 'AUTHOR',
}

const personThree = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};

for (const hobby of personThree.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()); // !!! ERROR !!!
}

if (personThree.role === Role.AUTHOR) {
  console.log('is author');
}

//unions - allow us to use a number or a string as the combine function arguments
//we will usually want to do some type of check to take specific action depending on our arguments
//you can accept as many types as you want
//without the runtime check we will receive an error - typescript knows that in the first block there are two numbers so we can add them
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);

//literal types - specify the exact value of what should be held
function combineTwo(
  input1: number | string,
  input2: number | string,
  //the union type combined with literal types will allow only these two strings which can help us with not memorizing those strings
  resultConversion: 'as-number' | 'as-text' //here we only want to two options of 'as-number' or 'as-text' which are literal types
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    //we can force how we want to return our output based on the resultConversion argument
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAgesTwo = combineTwo(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combineTwo('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNamesTwo = combineTwo('Max', 'Anna', 'as-text');
console.log(combinedNames);

//type aliases - good for decreasing duplication of code - we can define aliases and use them in place of our explicitly defined 'types' later on
type Combinable = number | string; //use the type keyword
type ConversionDescriptor = 'as-number' | 'as-text';

function combineThree(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAgesThree = combine(30, 26, 'as-number');
console.log(combinedAgesThree);

const combinedStringAgesThree = combine('30', '26', 'as-number');
console.log(combinedStringAgesThree);

const combinedNamesThree = combine('Max', 'Anna', 'as-text');
console.log(combinedNamesThree);

//type alises and object types
//this is the long version without type aliases
function greetOne(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlderOne(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

//the above can be changed to the following
type User = { name: string; age: number };

function greetTwo(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlderTwo(user: User, checkAge: number) {
  return checkAge > user.age;
}

//void and return types - the return type is inferred by TypeScript, however, if we know we don't want to return anything void should be used as the return type
function mySecondFunction(arg1: number, arg2: number): void {
  console.log(arg1 + arg2);
}

//functions as types - 'Function' is a type within typeScript and can be useful
let combineValues: (a: number, b: number) => number; //here we are stating combinedFunctions can only be a function that takes two numbers as arguments and returns a number

function add(n1: number, n2: number) {
  return n1 + n1;
}

function printResult(num: number): void {
  console.log('Result' + num);
}

combineValues = add;
combineValues = printResult; //get an error here because we are ont providing the right 'type' of function to combine values

console.log(combineValues(8, 8));

//callbacks as types - similar to above
function addTwo(n1: number, n2: number) {
  return n1 + n2;
}

function printResultTwo(num: number): void {
  console.log('Result: ' + num);
}

function addAndHandleTwo(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add(5, 12));

let combineValuesTwo: (a: number, b: number) => number;

combineValuesTwo = add;
// combineValues = printResult;
// combineValues = 5;

console.log(combineValuesTwo(8, 8));

// let someValue: undefined;

addAndHandleTwo(10, 20, (result) => {
  console.log(result);
});

//never type
//unknown type - if we explicitly try to assign a known type a value that is unknown we must first check the unknwon value type
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';
//unknown type - in here when we check for userInput which is unknown in order to assign it to userName which we defined as a string
//if you don't know what type you will have but know what you want to do with it unknown is a good type as its more restrictive than any
if (typeof userInput === 'string') {
  userName = userInput;
}

//never is the type for this function because it will 'NEVER' return any value
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
  // while (true) {}
}

generateError('An error occurred!', 500);

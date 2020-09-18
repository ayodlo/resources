/* Check all values in an array
Write a function called all which accepts an array and a callback and returns true if every 
value in the array returns true when passed as parameter to the callback function

Sample:
var allAreLessThanSeven = all([1,2,9], function(num){
	return num < 7;
});

console.log(allAreLessThanSeven); // false
*/

var allAreLessThanSeven = all([1,2,9], function(num){
	return num < 7;
});

console.log(allAreLessThanSeven); // false
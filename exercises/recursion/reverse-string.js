//Reverse String
//Implement a function that reverses a string using iteration...and then recursion!
function reverseString(str) {
    if (str.length === 1) {
        return str;
    }
    return str.slice(str.length - 1) + reverseString(str.slice(0, str.length - 1));
}

reverseString('yoyo mastery')//should return: 'yretsam oyoy'
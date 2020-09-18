// Factorials
    let answer = 1; 
    function findFactorialRecursive(number) {
        if (number === 2) {
            return 2;
        }
        return number * findFactorialRecursive(number - 1)
    }

    findFactorialRecursive(5);
//If you want, try to add a base case condition for the recursive solution if the parameter given is less than 2
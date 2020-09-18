// https://leetcode.com/problems/two-sum/description/

var twoSum = function (nums, target) {
  for (i = 0; i < nums.length; i++) {
    for (y = 0; y < nums.length; y++) {
      if (i === y) {
        y++;
      }
      else if (nums[i] + nums[y] === target) {
        const newArray = [nums[i], nums[y]]
        return newArray;
      }
    }
  }
  return "No Pairs for Target Exist"
}

console.log(twoSum([3, 6, 7, 1, 3, 7 , 100, 200, 293], 201));
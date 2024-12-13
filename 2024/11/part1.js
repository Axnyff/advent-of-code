let nums = require("fs").readFileSync("input").toString().trim().split(" ").map(Number);

for (let i = 0; i < 25; i++) {
  let newNums = [];
  for (let num of nums) {
    if (num === 0) {
      newNums.push(1);
    } else if (num.toString().length % 2 === 0) {
      let string = num.toString();
      let size = string.length / 2;

      newNums.push(Number(string.slice(0, size)));
      newNums.push(Number(string.slice(size)));
    } else {
      newNums.push(num * 2024);
    }
  }
  nums = newNums;
}
console.log(nums.length);

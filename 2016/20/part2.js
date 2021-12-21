const data = require("fs")
  .readFileSync("input")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split("-").map(Number))
  .sort(([a], [b]) => a - b);


let n = 0;
let index = 0;
let count = 0;
while (n <= 4294967295) {
  const [start, end] = data[index];
  if (start > n) {
    count++;
    n++;
  } else if (end <n) {
    index++
  } else {
    n++;
  }
}

console.log(count);

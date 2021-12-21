const data = require("fs")
  .readFileSync("input")
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split("-").map(Number))
  .sort(([a], [b]) => a - b);


let n = 0;
let index = 0;
while (true) {
  const [start, end] = data[index];
  if (start > n) {
    count++;
    break;
  } else {
    n = end + 1;
    index++;
  }
}

console.log(n);

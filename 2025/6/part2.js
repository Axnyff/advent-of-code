const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n");

const result = [];
let resultIndex = 0;
for (let i = 0; i < Math.max(...lines.map((l) => l.length)); i++) {
  let hasChar = false;
  let current = 0;
  for (let line of lines) {
    if (line[i] !== " ") {
      hasChar = true;
      if (line[i] === "+" || line[i] === "*") {
        result[resultIndex] = result[resultIndex] || { nums: [] };
        result[resultIndex].op = line[i];
      } else {
        current *= 10;
        current += Number(line[i]);
      }
    }
  }
  if (current) {
    result[resultIndex] = result[resultIndex] || { nums: [] };
    result[resultIndex].nums.push(current);
    current = 0;
  }
  if (!hasChar) {
    resultIndex += 1;
  }
}

const total = result
  .map((res) =>
    res.op === "*"
      ? res.nums.reduce((a, b) => a * b)
      : res.nums.reduce((a, b) => a + b),
  )
  .reduce((a, b) => a + b);

console.log(total);

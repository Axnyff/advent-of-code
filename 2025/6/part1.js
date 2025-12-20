const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((line) => line.split(/\s+/).filter((el) => el !== ""));

const operations = Array.from({ length: lines[0].length }, () => []);

let total = 0;
for (let line of lines) {
  for (let i = 0; i < line.length; i++) {
    const item = line[i];
    if (item === "+") {
      total += operations[i].reduce((a, b) => a + b);
    } else if (item === "*") {
      total += operations[i].reduce((a, b) => a * b);
    } else {
      operations[i].push(Number(item));
    }
  }
}
console.log(total);

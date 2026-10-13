const data = require("fs")
  .readFileSync("test-input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map(Number);

const next = (n) => {
  const step1 = n ^ (n * 64);
  const step2 = (Math.floor(step1 / 32) ^ step1) % 16777216;
  const step3 = ((step2 * 2048) ^ step2) % 16777216;
  return step3;
};

const nNext = (n, amount) => {
  let start = n;
  for (let i = 0; i < amount; i++) {
    start = next(start);
  }
  return start;
};

console.log(next(123, 3));
for (let item of data) {
  const newItem = nNext(item, 20);
  console.log(newItem);
}

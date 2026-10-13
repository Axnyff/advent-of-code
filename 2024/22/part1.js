const data = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map(Number);

const next = (n) => {
  const step1 = n ^ (n * 64n) % 16777216n;
  const step2 = ((step1 / 32n) ^ step1) % 16777216n;
  const step3 = ((step2 * 2048n) ^ step2) % 16777216n;
  return step3;
};

const nNext = (n, amount) => {
  let start = n;
  for (let i = 0; i < amount; i++) {
    start = next(start);
  }
  return start;
};

let sum = 0n;
for (let item of data) {
  sum += nNext(BigInt(item), 2000)
}
console.log(sum);

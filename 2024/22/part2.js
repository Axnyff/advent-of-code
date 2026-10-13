let data = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map(Number);

const next = (n) => {
  const step1 = n ^ ((n * 64n) % 16777216n);
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

const monkeys = [];
for (let item of data) {
  let monkey = {};
  let monkey2 = [];
  let start = BigInt(item);
  let diff = start % 10n;
  let lastFour = [];
  for (let i = 0; i < 2000; i++) {
    let newVal = next(start);
    lastFour.push((newVal % 10n) - diff);
    diff = newVal % 10n;
    start = newVal;
    if (lastFour.length > 4) {
      lastFour = lastFour.slice(1);
    }
    if (lastFour.length === 4) {
      const k = lastFour.join(",");
      if (!monkey[k]) {
        monkey[k] = diff;
      }
    }
  }
  monkeys.push(monkey);
}
console.log("COMPUTED");

let maxSum = 0;
let maxValue;
for (let a = -9; a < 10; a++) {
  console.log(a);
  for (let b = -9; b < 10; b++) {
    for (let c = -9; c < 10; c++) {
      for (let d = -9; d < 10; d++) {
        let sum = 0n;
        const joined = [a, b, c, d].join(",")
        for (let monkey of monkeys) {
          sum += monkey[joined] || 0n;
        }
        if (sum > maxSum) {
          maxSum = sum;
          maxValue = joined;
        }
      }
    }
  }
}

console.log(maxSum, maxValue);

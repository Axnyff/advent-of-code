const [rawRanges, ingredients] = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n")
  .map((el) => el.split("\n"));

const ranges = rawRanges.map((r) => r.split("-").map(Number));

const freshIngredients = ingredients.filter((ingredient) => {
  return ranges.some(
    ([start, end]) => ingredient >= start && ingredient <= end,
  );
});

const sortedRanges = ranges.sort(([x1, y1], [x2, y2]) => {
  if (x1 < x2) {
    return -1;
  }
  if (x1 > x2) {
    return 1;
  }
  return y1 - y2;
});

console.log(freshIngredients.length);

let allTotal = 0;
let currentMin = 0;
for (let range of sortedRanges) {
  if (currentMin >= range[1]) {
    continue;
  }
  allTotal +=
    range[1] - Math.max(currentMin, range[0]) + (range[0] > currentMin ? 1 : 0);
  currentMin = range[1];
}
console.log(allTotal);

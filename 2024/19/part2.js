const fs = require("fs");

const [rawTowels, rawItems] = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

const towels = rawTowels.split(", ");
const items = rawItems.split("\n");

const inputs = {};
const getCount = (item) => {
  let toExplore = new Map();
  let count = 0;
  toExplore.set(item, 1);
  while (toExplore.size) {
    let newToExplore = new Map();
    for (let [item, c] of toExplore.entries()) {
      for (let towel of towels) {
        if (item === towel) {
          count += c;
        }
        if (item.startsWith(towel)) {
          newToExplore.set(
            item.slice(towel.length),
            c + (newToExplore.get(item.slice(towel.length)) || 0),
          );
        }
      }
    }
    toExplore = newToExplore;
  }
  return count;
};

const validItems = items.map((item) => {
  return getCount(item);
});

console.log(validItems.reduce((a, b) => a + b));

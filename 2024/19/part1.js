const fs = require("fs");

const [rawTowels, rawItems] = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

const towels = rawTowels.split(", ");
const items = rawItems.split("\n");

const inputs = {};
const isValid = (item) => {
  let toExplore = new Set();
  toExplore.add(item);
  while (toExplore.size) {
    let newToExplore = new Set();
    for (let item of toExplore) {
      for (let towel of towels) {
        if (item === towel) {
          return true;
        }
        if (item.startsWith(towel)) {
          newToExplore.add(item.slice(towel.length));
        }
      }
    }
    toExplore = newToExplore;
  }
  return false;
};

const validItems = items.filter((item) => {
  return isValid(item);
});

console.log(validItems.length);

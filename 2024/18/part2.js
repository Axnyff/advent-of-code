const fs = require("fs");

const data = fs.readFileSync("input").toString().slice(0, -1).split("\n");

const start = 0;
const end = 70;

const key = (x, y) => x + "," + y;
const unkey = (k) => k.split(",").map(Number);

const isPossible = (n) => {
  let toExplore = new Set(["0,0"]);
  let explored = new Set();
  const blocked = new Set(data.slice(0, n));
  outer: while (toExplore.size) {
    const newToExplore = new Set();
    for (let item of toExplore) {
      explored.add(item);
      const [x, y] = unkey(item);
      for (let [newX, newY] of [
        [x + 1, y],
        [x - 1, y],
        [x, y - 1],
        [x, y + 1],
      ]) {
        const k = key(newX, newY);
        if (k === `${end},${end}`) {
          return true;
        }
        if (
          newX >= 0 &&
          newX <= end &&
          newY >= 0 &&
          newY <= end &&
          !blocked.has(k) &&
          !explored.has(k)
        ) {
          newToExplore.add(k);
        }
      }
    }
    toExplore = newToExplore;
  }
  return false;
};

for (let i = 2900; i < data.length; i ++ ) {
  if (!isPossible(i)) {
    console.log(data[i - 1]);
    break;
  }
}

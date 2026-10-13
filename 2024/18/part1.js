const fs = require("fs");

const data = new Set(
  fs.readFileSync("input").toString().slice(0, -1).split("\n").slice(0, 1024),
);

const start = 0;
const end = 70;

const key = (x, y) => x + "," + y;
const unkey = (k) => k.split(",").map(Number);
const grid = {};


let toExplore = new Set(["0,0"]);

let iter = 0;
outer: while (toExplore.size) {
  iter++;
  const newToExplore = new Set();
  for (let item of toExplore) {
    const [x, y] = unkey(item);
    for (let [newX, newY] of [
      [x + 1, y],
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      const k = key(newX, newY);
      if (k === `${end},${end}`) {
        console.log(iter);
        break outer;
      }
      if (newX >= 0 && newX <= end && newY >= 0 && newY <= end && !data.has(k)) {
        newToExplore.add(k);
      }
    }
  }
  toExplore = newToExplore;
}

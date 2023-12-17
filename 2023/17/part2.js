const chart = {};

const key = (...items) => items.join(",");
const parseKey = (key) => key.split(",").map(Number);

let yMax = 0;
let xMax = 0;
require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .forEach((l, y) => {
    if (y > yMax) {
      yMax = y;
    }
    l.split("").forEach((c, x) => {
      if (x > xMax) {
        xMax = x;
      }
      chart[key(x, y)] = Number(c);
    });
  });

let min = 1500;
let toExplore = new Set(["0,0,0,0,0"]);
toExplore;

const dirs = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

let iters = 0;
let visited = new Map();
while (toExplore.size) {
  let newToExplore = new Set();
  for (let item of toExplore) {
    const [x, y, cost, dirIndex, straights] = parseKey(item);
    const dir = dirs[dirIndex];
    if (straights < 9) {
      let xNew = x + dir[0];
      let yNew = y + dir[1];
      let costAdd = chart[key(xNew, yNew)];
      let newCost = cost + costAdd;

      if (xNew === xMax && yNew === yMax && newCost < min && straights >= 2) {
        min = newCost;
      } else if (costAdd && newCost < min) {
        let value = visited.get(key(xNew, yNew, dirIndex, straights + 1)) || Infinity;
        if (value > newCost) {
          visited.set(key(xNew, yNew, dirIndex, straights + 1), newCost);
          newToExplore.add(key(xNew, yNew, newCost, dirIndex, straights + 1));
        }
      }
    }

    if (straights >= 3) {
      let newDirIndex = (dirIndex + 1) % 4;
      let newDir = dirs[newDirIndex];
      let xNew = x + newDir[0];
      let yNew = y + newDir[1];
      let costAdd = chart[key(xNew, yNew)];
      let newCost = cost + costAdd;
      if (xNew === xMax && yNew === yMax && newCost < min && straights >= 3) {
        min = newCost;
      } else if (costAdd && newCost < min) {
        let value = visited.get(key(xNew, yNew, newDirIndex, 0)) || Infinity;
        if (value > newCost) {
          visited.set(key(xNew, yNew, newDirIndex, 0), newCost);
          newToExplore.add(key(xNew, yNew, newCost, newDirIndex, 0));
        }
      }
    }

    if (straights >= 3) {
      let newDirIndex = (dirIndex + 3) % 4;
      let newDir = dirs[newDirIndex];
      let xNew = x + newDir[0];
      let yNew = y + newDir[1];
      let costAdd = chart[key(xNew, yNew)];
      let newCost = cost + costAdd;
      if (xNew === xMax && yNew === yMax && newCost < min && straights >= 3) {
        min = newCost;
      } else if (costAdd && newCost < min) {
        let value = visited.get(key(xNew, yNew, newDirIndex, 0)) || Infinity;
        if (value > newCost) {
          visited.set(key(xNew, yNew, newDirIndex, 0), newCost);
          newToExplore.add(key(xNew, yNew, newCost, newDirIndex, 0));
        }
      }
    }
  }
  // if (iters === 2) {

  //   break;
  // }
  iters++;
  toExplore = newToExplore;
}
console.log(min);

const md5 = require("md5");
const input = "pxxbnzuo";

const getKey = (x, y) => `${x}-${y}`;

const order = 'UDLR';
const getPossible = (path) => {
  const hash = md5(input + path);
  return Array.from({ length: 4}, (_, i) => ["b", "c", "d", "e", "f"].includes(hash[i]));
};

const target = "3-3";

const walkPath = (path) => {
  let x = 0;
  let y = 0;
  for (let segment of path) {
    if (segment === "U") {
      x--;
    }
    if (segment === "D") {
      x++;
    }
    if (segment === "R") {
      y++;
    }
    if (segment === "L") {
      y--;
    }
  }
  return [x, y];
};

let toexplore = new Set();
toexplore.add("");

let done = false;
let max = 0;
while (toexplore.size) {
  let newtoexplore = new Set();
  for (let path of toexplore) {
    const [x, y] = walkPath(path);
    if (x === 3 && y === 3) {
      max = Math.max(max, path.length);
      continue;
    }
    const [up, down, left, right] = getPossible(path);
    if (up && x >= 1) {
      newtoexplore.add(path + "U");
    }
    if (down && x <= 2) {
      newtoexplore.add(path + "D");
    }
    if (left && y >= 1) {
      newtoexplore.add(path + "L");
    }
    if (right && y <= 2) {
      newtoexplore.add(path + "R");
    }
  }
  toexplore = newtoexplore;
}
console.log(max);

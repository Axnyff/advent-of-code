const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");

let blizards = [];
let yMax = lines.length - 1;
let xMax = lines[0].length - 1;
lines.forEach((line, y) => {
  line.split("").forEach((c, x) => {
    if (![".", "#"].includes(c)) {
      blizards.push([x, y, c]);
    }
  });
});
let xT = xMax - 1;
let yT = yMax;

const key = (x, y) => x + "," + y;
const parse = (key) => {
  const [x, y] = key.split(",");
  return [Number(x), Number(y)]
};

let toExplore = new Set();
toExplore.add("1,0");
let explored = new Set();

const diffs = {
  ">": [1, 0],
  "<": [-1, 0],
  "v": [0, 1],
  "^": [0, -1],
};

let count = -1;
while (toExplore.size) {
  count ++;
  let newToExplore = new Set();
  blizards = blizards.map(([x, y, dir]) => {
    const [xD, yD] = diffs[dir];
    x += xD;
    y += yD;
    if (x === xMax) {
      x = 1;
    }
    if (x === 0) {
      x = xMax - 1;
    }
    if (y === yMax) {
      y = 1;
    }
    if (y === 0) {
      y = yMax - 1;
    }
    return [x, y, dir];
  });

  const addExplore = (x, y) => {
    if (newToExplore.has(key(x, y))) {
      return;
    }
    if (x === 0 || x === xMax || y < 0 || (y === 0 && x !== 1) || (y === yMax && x !== xT)) {
      return;
    }
    if (blizards.some(b => b[0] === x && b[1] === y)) {
      return;
    }
    newToExplore.add(key(x, y));
  };

  for (let pos of toExplore) {
    const [x, y] = parse(pos);
    if (x === xT && y === yT) {
      console.log(count);
      return;
    }
    addExplore(x, y);
    addExplore(x, y +1);
    addExplore(x, y -1);
    addExplore(x + 1, y);
    addExplore(x - 1, y);
  }
  toExplore = newToExplore;
}

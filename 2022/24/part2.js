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

const key = (x, y, state) => x + "," + y + "," + state;
const parse = (key) => {
  const [x, y, state] = key.split(",");
  return [Number(x), Number(y), Number(state)]
};

let toExplore = new Set();
toExplore.add("1,0,0");
let explored = new Set();

const diffs = {
  ">": [1, 0],
  "<": [-1, 0],
  "v": [0, 1],
  "^": [0, -1],
};

let count = -1;
let state = 0;
let keep = 0;
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

  let blizzardsKeys = Object.fromEntries(blizards.map(([x, y]) => [x + "," + y, true]));
  let bestState = 0;
  const addExplore = (x, y, state) => {
    if (state < bestState) {
      return;
    }
    if (newToExplore.has(key(x, y, state))) {
      return;
    }
    if (x === 0 || x === xMax || y < 0 || (y === 0 && x !== 1) || (y === yMax && x !== xT)) {
      return;
    }
    if (blizzardsKeys[x + "," + y]) {
      return;
    }
    newToExplore.add(key(x, y, state));
  };

  for (let pos of toExplore) {
    let [x, y, state] = parse(pos);
    bestState = Math.max(state, bestState);
    if (bestState > keep) {
      keep = bestState;
      console.log(bestState);
    }
    if (x === xT && y === yT && state === 0) {
      state = 1;
    }
    if (x === 1 && y === 0 && state === 1) {
      state = 2;
    }
    if (x === xT && y === yT && state === 2) {
      console.log(count);
      return;
    }
    addExplore(x, y, state);
    addExplore(x, y +1, state);
    addExplore(x, y -1, state);
    addExplore(x + 1, y, state);
    addExplore(x - 1, y, state);
  }
  toExplore = newToExplore;
}

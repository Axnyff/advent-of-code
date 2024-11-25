const fs = require("fs");

const key = (x, y) => x + "-" + y;
const parseKey = (key) => key.split("-").map(Number);

const map = {
};
let yMax = 0;
let xMax = 0;

fs.readFileSync("test-input").toString().slice(0, -1).split("\n").forEach((line, y) => {
  if (y > yMax) {
    yMax = y;
  }
  line.split("").forEach((char, x) => {
    if (x > xMax) {
      xMax = x;
    }
    map[key(x, y)] = char;
  });
});

const start = "1-0";

let toExplore = new Set();
toExplore.add(start);

let moves = 0;
let max = 0;
const run = (m, explored, pos) => {
  let position = pos;
  let moves = m;
  while (true) {
    explored.push(position);
    moves += 1;
    const [x, y] = parseKey(position);

    const positions = [];
    for (let k of [key(x + 1, y), key(x - 1, y), key(x, y + 1), key(x, y - 1)]) {
      if (!!map[k] && map[k] !== "#" && !explored.includes(k)) {
        positions.push(k);
      }
    }

    if (positions.length === 0) {
      if (moves > max) {
        max = moves;
        if (max === 166) {
          for (let expl of explored) {
            map[expl] = "O";
          }
          printMap();
          console.log(JSON.stringify(explored))

          for (let i of explored) {
            if (explored.indexOf(i) !== explored.lastIndexOf(i)) {
              console.log("OOOO");
            }
          }
        }
      }
      return moves;
    }
    if (positions.length === 1) {
      position = positions[0];
      continue;
    }
    return Math.max(...positions.map(pos => run(moves, [...explored], pos)));
  }
};

const printMap = () => {
  for (let y = 0; y <= yMax; y++) {
    let line = '';
    for (let x = 0; x <= xMax; x++) {
      line += map[key(x, y)];
    }
    console.log(line);
  }

};


console.log(run(-1, [], start));

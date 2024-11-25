const fs = require("fs");

const key = (x, y) => x + "-" + y;
const parseKey = (key) => key.split("-").map(Number);

const map = {
};

const data = fs.readFileSync("input").toString().slice(0, -1).split("\n").forEach((line, y) => {
  line.split("").forEach((char, x) => {
    map[key(x, y)] = char;
  });
});

const start = "1-0";

let toExplore = new Set();
toExplore.add(start);

let moves = 0;

const run = (m, explored, pos) => {
  let position = pos;
  let moves = m;
  while (true) {
    explored.add(position);
    moves += 1;
    const [x, y] = parseKey(position);
    if (map[position] === ">") {
      let k = key(x + 1, y);
      if (map[k] === "." && !explored.has(k)) {
        position = k;
        continue;
      }
      return moves;
    }
    if (map[position] === "^") {
      let k = key(x, y - 1);
      if (map[k] === "." && !explored.has(k)) {
        position = k;
        continue;
      }
      return moves;
    }
    if (map[position] === "v") {
      let k = key(x, y + 1);
      if (map[k] === "." && !explored.has(k)) {
        position = k;
        continue;
      }
      return moves;
    }
    if (map[position] === "<") {
      let k = key(x - 1, y);
      if (map[k] === "." && !explored.has(k)) {
        position = k;
        continue;
      }
      return moves;
    }

    const positions = [];
    for (let k of [key(x + 1, y), key(x - 1, y), key(x, y + 1), key(x, y - 1)]) {
      if (!!map[k] && map[k] !== "#" && !explored.has(k)) {
        positions.push(k);
      }
    }

    if (positions.length === 0) {
      return moves;
    }
    if (positions.length === 1) {
      position = positions[0];
      continue;
    }
    return Math.max(...positions.map(pos => run(moves, new Set(explored), pos)));
  }
};

console.log(run(-1, new Set(), start));

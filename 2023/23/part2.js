const fs = require("fs");

const key = (x, y) => x + "-" + y;
const parseKey = (key) => key.split("-").map(Number);

const map = {};
let yMax = 0;
let xMax = 0;

fs.readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .forEach((line, y) => {
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

const graph = {};

const createGraph = (pos, prev) => {
  let position = pos;
  let moves = -1;
  let explored = [];

  while (true) {
    explored.push(position);
    moves += 1;
    const [x, y] = parseKey(position);

    const positions = [];
    for (let k of [
      key(x + 1, y),
      key(x - 1, y),
      key(x, y + 1),
      key(x, y - 1),
    ]) {
      if (!!map[k] && map[k] !== "#" && !explored.includes(k)) {
        if (moves === 0 && graph[k]) {
        } else {
          positions.push(k);
        }
      }
    }

    if (graph[position]?.[prev]) {
      return;
    }

    if (positions.length === 0) {
      graph[prev] = graph[prev] || {};
      graph[prev][position] = moves + 1;
      graph[position] = graph[position] || {};
      graph[position][prev] = moves + 1;
      return;
    }
    if (positions.length === 1) {
      position = positions[0];
      continue;
    }

    graph[prev] = graph[prev] || {};
    graph[prev][position] = moves + 1;
    graph[position] = graph[position] || {};
    graph[position][prev] = moves + 1;

    positions
      .filter((pos) => !graph[pos] && pos !== position && pos !== prev)
      .forEach((pos) => createGraph(pos, position));
    break;
  }
};

createGraph(start, start);

const walkGraph = (position, moves, explored) => {
  return Math.max(
    ...Object.entries(graph[position]).map(([pos, count]) => {
      if (explored.includes(pos)) {
        return 0;
      }
      if (pos === key(xMax - 1, yMax)) {
        return moves + count;
      }
      return walkGraph(pos, moves + count, [...explored, position]);
    })
  );
};

console.log(walkGraph("1-0", 0, []) - 1);

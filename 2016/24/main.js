const fs = require("fs");
const input = fs.readFileSync("input").toString().split("\n").slice(0, -1);

const items = {};
let max = 0;
const maxX = input[0].length - 1;
const maxY = input.length - 1;
for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    if (input[y][x].match(/\d/)) {
      max = Math.max(parseInt(input[y][x]), max);
      items[input[y][x]] = [x, y];
    }
  }
}

const graph = {};
for (let i = 0; i <= max; i++) {
  graph[i] = {};
}

const key = (x, y) => `${x}-${y}`;
const unkey = (key) => key.split('-').map(Number);
const findNodes = (start) => {
  const visited = new Set();
  let toVisit = [];

  let position = items[start];
  toVisit.push(position);
  let steps = 0;
  while (toVisit.length) {
    const newToVisit = new Set();
    while (toVisit.length) {
      const visit = toVisit.pop();
      visited.add(key(...visit));
      const num = input[visit[1]][visit[0]];
      if (input[visit[1]][visit[0]].match(/\d/) && num !== start) {
        graph[start][num] = steps;
      }
      for (let [x, y] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
        const newLocation = [visit[0] + x, visit[1] + y];
        if (input[visit[1]][visit[0]] !== "#" && !visited.has(key(...newLocation)) && visit[0] + x >= 0 && visit[0] + x <= maxX && visit[1] + y >= 0 && visit[1] + y <= maxY) {
          newToVisit.add(key(...newLocation));
        }
      }
    }
    steps++;
    toVisit = [...newToVisit].map(unkey);
  }
};

for (let i = 0; i <= max; i ++) {
  console.log("node", i);
  findNodes(i.toString());
}

let min = Infinity;

const computeGraph = (items) => {
  let first = items.pop();
  let second = items.pop();
  let total = 0;
  while (second) {
    total += graph[first][second];
    first = second;
    second = items.pop();
  }
  return total;
};

const resolveGraph = (current = ["0"]) => {
  if (current.length === max + 2) {
    min = Math.min(computeGraph(current), min);
    return;
  }
  for (let key of Object.keys(graph[current[current.length - 1]])) {
    if (!current.includes(key)) {
      resolveGraph([...current, key]);
    } else if (current.length === max + 1) {
      resolveGraph([...current, "0"]);
    }
  }
};

console.log("computing");
resolveGraph();
console.log(min);

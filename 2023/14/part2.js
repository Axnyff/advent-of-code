let graph = {};

let yMax = 0;
let xMax = 0;
const key = (x, y) => x + "," + y;
require("fs")
  .readFileSync("test-input")
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
      const k = key(x, y);
      if (c === "#" || c === "O") {
        graph[k] = c;
      }
    });
  });

const showGraph = () => {
  let res = "";
  for (let y = 0; y <= yMax; y++) {
    let line = "";
    for (let x = 0; x <= xMax; x++) {
      res += graph[key(x, y)] || ".";
    }
    res += line + "\n";
  }
  return res;
};
const computeTotal = () => {
  let total = 0;
  for (let y = 0; y <= yMax; y++) {
    let line = "";
    for (let x = 0; x <= xMax; x++) {
      if (graph[key(x, y)] === "O") {
        total += yMax - y + 1;
      }
    }
  }
  return total;
};

const dirs = ["N", "W", "S", "E"]

const advanceGraph = (i) => {
  let newGraph = {};

  const dir = dirs[i % 4];

  if (dir === "N") {
    for (let y = 0; y <= yMax; y++) {
      for (let x = 0; x <= xMax; x++) {
        let k = key(x, y);
        if (graph[k] === "#") {
          newGraph[k] = "#";
        } else if (graph[k] === "O") {
          let i = y;
          while (i >= 0 && !newGraph[key(x, i -1)]) {
            i--;
          }
          i = Math.max(0, i);
          newGraph[key(x, i)] = "O"
        }
      }
    }
  }
  if (dir === "E") {
    for (let x = xMax; x >= 0; x--) {
      for (let y = yMax; y >= 0; y--) {
        let k = key(x, y);
        if (graph[k] === "#") {
          newGraph[k] = "#";
        } else if (graph[k] === "O") {
          let i = x;
          while (i <= xMax && !newGraph[key(i + 1, y)]) {
            i++;
          }
          i = Math.min(xMax, i);
          newGraph[key(i, y)] = "O"
        }
      }
    }
  }
  if (dir === "W") {
    for (let x = 0; x <= xMax; x++) {
      for (let y = 0; y <= yMax; y++) {
        let k = key(x, y);
        if (graph[k] === "#") {
          newGraph[k] = "#";
        } else if (graph[k] === "O") {
          let i = x;
          while (i >= 0 && !newGraph[key(i - 1, y)]) {
            i--;
          }
          i = Math.max(0, i);
          newGraph[key(i, y)] = "O"
        }
      }
    }
  }
  if (dir === "S") {
    for (let y = yMax; y >= 0; y--) {
      for (let x = xMax; x >= 0; x--) {
        let k = key(x, y);
        if (graph[k] === "#") {
          newGraph[k] = "#";
        } else if (graph[k] === "O") {
          let i = y;
          while (i <= yMax && !newGraph[key(x, i +1)]) {
            i++;
          }
          i = Math.min(yMax, i);
          newGraph[key(x, i)] = "O"
        }
      }
    }
  }
  return newGraph
};
const graphs = new Map();

let amount = 1_000_000_000 * 4
let iterations = 0;
let counts = 0;
let remaining = 0;
let interval = 0;
for (let i = 0; i < amount; i++) {
  graph = advanceGraph(i);
  let show = showGraph();
  if (graphs.has(show)) {
    interval = i - graphs.get(show);
    remaining = amount - i;
    counts = (amount - i) % interval;
    console.log(counts);
    break;
  }
  graphs.set(show, i);
}

console.log(remaining, interval);
console.log(remaining % interval);
for (let i = 0; i < 15; i++) {
  graph = advanceGraph(i);

}
console.log(computeTotal());

// bigger than 1255
// bigger than 98323

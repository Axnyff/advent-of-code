const graph = {};

let yMax = 0;
let xMax = 0;
const key = (x, y) => x + "," + y;
require("fs").readFileSync("input").toString().slice(0, -1).split("\n").forEach((l, y) => {
  if (y > yMax) {
    yMax = y;
  }
  l.split("").forEach((c, x) => {
    if (x > xMax) {
      xMax = x;
    }
    const k = key(x, y);
    if (c === "#") {
      graph[k] = "#";
    } else if (c === "O") {
      let i = y;
      while (i >= 0 && !graph[key(x, i -1)]) {
        i--;
      }
      i = Math.max(0, i);
      graph[key(x, i)] = "O";
    }
  });
});

const showGraph = () => {
  for (let y = 0; y <= yMax; y++) {
    let line = "";
    for (let x = 0; x <= xMax; x++) {
      line += (graph[key(x, y)] || ".")
    }
    console.log(line);
  }
};

let total = 0;
for (let y = 0; y <= yMax; y++) {
  let line = "";
  for (let x = 0; x <= xMax; x++) {
    if (graph[key(x, y)] === "O") {
      total += yMax - y + 1;
    }
  }
}

console.log(total);

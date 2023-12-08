const lcm = require("lcm");
const data = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

const dirs = data[0];
const graph = data[1].split("\n").reduce((graph, item) => {
  const [node, rest] = item.split(" = ");
  const [L, R] = rest.slice(1, -1).split(", ");
  graph[node] = { L, R };
  return graph;
}, {});

let pos = "AAA";
let step = 0;
while (pos !== "ZZZ") {
  for (let dir of dirs) {
    step++;
    pos = graph[pos][dir];
  }
}

console.log(step);

let pos2 = Object.keys(graph).filter((key) => key.endsWith("A"));
let steps = [];
for (let pos of pos2) {
  let step2 = 0;
  while (!pos.endsWith("Z")) {
    for (let dir of dirs) {
      step2++;
      pos = graph[pos][dir];
    }
  }
  steps.push(step2);
}

console.log(steps.reduce((r, a) => lcm(r, a), 1));

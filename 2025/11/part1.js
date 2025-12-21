const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");

const graph = {};

for (line of lines) {
  const [a, ends] = line.split(": ");
  graph[a] = ends.split(" ");
}

let toExplore = new Set(graph.you.map(el => [el].join(",")));

let paths = 0;
while (toExplore.size) {
  const newToExplore = new Set();
  for (let item of toExplore) {
    const splitted = item.split(",");
    for (let newPath of graph[splitted.at(-1)]) {
      if (newPath === "out") {
        paths++;
      } else if (!splitted.includes(newPath)) {
        newToExplore.add([...splitted, newPath].join(","));
      }
    }
    toExplore = newToExplore;
  }
}
console.log(paths)

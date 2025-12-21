const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n");

const graph = {};

for (line of lines) {
  const [a, ends] = line.split(": ");
  graph[a] = ends.split(" ");
}

Object.entries(graph).forEach(([key, content]) => {
  console.log(key, content);
  if (content.length === 1) {

  }
});

return;
const exploration = (start, end) => {
  let toExplore = new Set(graph[start]);

  let paths = 0;
  while (toExplore.size) {
    paths++;
    const newToExplore = new Set();
    for (let item of toExplore) {
      for (let newPath of graph[item] || []) {
        if (newPath === start) {
          return paths;
        }
        newToExplore.add(newPath);
      }
      toExplore = newToExplore;
    }
  }
  return paths;
};
console.log(exploration("svr", "out"));

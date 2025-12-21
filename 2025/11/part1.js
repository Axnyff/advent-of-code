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

const explore = (start, end) => {
  let paths = 0;
  let toExplore = {};
  for (let item of graph[start]) {
    toExplore[item] = 1;
  }
  while (Object.keys(toExplore).length) {
    const newToExplore = {};
    for (let item of Object.keys(toExplore)) {
      for (let newPath of graph[item]) {
        if (newPath === end) {
          paths += toExplore[item];
        } else {
          if (newToExplore[newPath]) {
            newToExplore[newPath] += toExplore[item];
          } else {
            newToExplore[newPath] = toExplore[item];
          };
        }
      }
    }
    toExplore = newToExplore;
  }
  return paths;
};

console.log(explore("you", "out"));

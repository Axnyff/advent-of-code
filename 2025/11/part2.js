const fs = require("fs");
const lines = fs.readFileSync("input").toString().slice(0, -1).split("\n");

const graph = {};

for (line of lines) {
  const [a, ends] = line.split(": ");
  graph[a] = ends.split(" ");
}

console.log(Object.keys(graph).length);

let simplified = true;
while (simplified) {
  simplified = false;
  Object.entries(graph).forEach(([key, content]) => {
    if (content.length === 1) {
      Object.keys(graph).forEach((key2) => {
        if (graph[key2]?.includes(key)) {
          simplified = true;
          delete graph[key];
          graph[key2] = graph[key2].filter((el) => el !== key);
        }
      });
    }
  });
}
let res = ``;
Object.entries(graph).forEach(([key, content]) => {
  res += `${key}: ${content.join(" ")}\n`;
});
fs.writeFileSync("input2", res);

console.log(Object.keys(graph).length);
return;
// const exploration = (start, end) => {
//   let toExplore = new Set(graph[start]);

//   let paths = 0;
//   while (toExplore.size) {
//     paths++;
//     const newToExplore = new Set();
//     for (let item of toExplore) {
//       for (let newPath of graph[item] || []) {
//         if (newPath === start) {
//           return paths;
//         }
//         newToExplore.add(newPath);
//       }
//       toExplore = newToExplore;
//     }
//   }
//   return paths;
// };
// console.log(exploration("svr", "out"));

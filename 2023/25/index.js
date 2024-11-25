const lines = require("fs").readFileSync("input").toString().trim().split("\n");
const graph = {};

for (let line of lines) {
  let [start, conn] = line.split(": ");
  const connections = conn.split(" ");
  graph[start] = graph[start] || new Set();
  for (let connection of connections) {
    graph[start].add(connection);
    graph[connection] = graph[connection] || new Set();
    graph[connection].add(start);
  }
}

const connections = {};

const countConnections = (a, b) => {
  let conn = 0;

  let toExplore = new Set([a]);
  let explored = new Set([a]);

  while (toExplore.size) {
    let newToExplore = new Set();
    for (let item of toExplore) {
      explored.add(item);
      for (let next of graph[item]) {
        if (!explored.has(next)) {
          if (next !== b) {
            newToExplore.add(next);
            explored.add(next);
          } else {
            conn++;
          }
        }
      }
    }
    toExplore = newToExplore;
  }

  return conn;
};

// let output = `digraph {\n`;
// let dones = [];
// for (let a of Object.keys(graph)) {
//   for (let node of graph[a]) {
//     if (!dones.includes(node + a)) {
//       dones.push(node + a);
//       dones.push(a + node);
//       output += `${node} -> ${a}\n`
//     }
//   }
// }
// output += '}';
// console.log(output);

const findPath = (a, b) => {
  let toExplore = new Set([a]);
  let explored = new Set([a]);

  while (true) {
    let newToExplore = new Set();
    for (let path of toExplore) {
      const current = path.split(",").at(-1);
      for (let item of graph[current]) {
        if (item === b) {
          console.log(path);
          return;
        }
        if (explored.has(item)) {
          continue;
        }
        explored.add(item);
        newToExplore.add(path + "," + item);
      }
    }
    toExplore = newToExplore;
  }
};

const countGraphSize = (node) => {
  let count = 0;

  let toExplore = new Set([node]);
  let explored = new Set([node]);
  while (toExplore.size) {
    console.log(count);
    let newToExplore = new Set();
    for (let item of toExplore) {
      console.log(item);
      explored.add(item);
      count++;
      for (let node of graph[item]) {
        if (!explored.has(node)) {
          explored.add(node);
          newToExplore.add(node);
        }
      }
    }
    toExplore = newToExplore;
  }
  return count;
};

const size = countGraphSize("hzj");
const size2 = countGraphSize("gsm");
console.log(size);
console.log(size2, Object.keys(graph).length - size);
console.log(size * size2);

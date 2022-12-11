const stars = require('fs').readFileSync('input').toString().slice(0, -1).split("\n").map((el, index) => [index.toString(), el.split(",").map(Number)]);

const distance = ([a, b, c, d], [a2, b2, c2, d2]) =>
  Math.abs(a - a2) + Math.abs(b - b2) + Math.abs(c - c2) + Math.abs(d - d2);

const countConstellations = (stars) => {
  const graph = {};
  for (let starA of stars) {
    graph[starA[0]] = new Set();
    for (let starB of stars) {
      if (starA[0] === starB[0]) {
        continue;
      }
      const dist = distance(starA[1], starB[1]);
      if (dist <= 3) {
        graph[starA[0]].add(starB[0])
        graph[starB[0]] = graph[starB[0]] || new Set();
        graph[starB[0]].add(starA[0])
      }
    }
  }

  let processed = new Set();
  let count = 0;
  console.log(graph);
  for (let item of Object.keys(graph)) {
    if (processed.has(item)) {
      continue;
    }
    let curr = [item];
    processed.add(item);
    count++;
    let toProcess = [...graph[item]];

    while (toProcess.length) {
      let newItem = toProcess.pop();
      curr.push(newItem);
      if (!processed.has(newItem)) {
        toProcess.push(...graph[newItem])
      }
      processed.add(newItem);
    }
    console.log(curr);
  }
  return count;

};

console.log(countConstellations(stars));


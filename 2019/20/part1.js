const lines = require('fs').readFileSync('input').toString().trimEnd().split("\n").map(el => el.split(""));

const portals = {};

const getCell = (i, j) => {
  return lines[i]?.[j] || "#";
};

const getKey = (i, j) => `${i},${j}`;

const parseKey = (key) => key.split(",").map(Number);
const offsets = [[-1, 0], [1, 0], [0, 1], [0, -1]];

lines.forEach((line, i) => {
  line.forEach((_, j) => {
    const cell = lines[i][j];
    if (cell.match(/^[A-Z]$/)) {
      const neighbours = offsets.map(([dx, dy]) => [dx + i, dy + j, getCell(i + dx, j +  dy)]);
      const correctNeighbourg = neighbours.find(el => el[2].includes("."));
      if (correctNeighbourg) {
        const otherLetter = neighbours.find(el => el[2].match(/[A-Z]/));
        let portal = (cell + otherLetter[2]).split("").sort().join("");
        if (portals[portal]) {
          portal = portal + "2";
        }
        portals[portal] = getKey(correctNeighbourg[0], correctNeighbourg[1]);
        lines[correctNeighbourg[0]][correctNeighbourg[1]] = portal;
        lines[otherLetter[0]][otherLetter[1]] = " ";
        lines[i][j] = " ";
      }
    }
  });
});

const explore = (start) => {
  const result = [];
  let toExplore = [start];
  const explored = new Set();
  let step = 0;
  while (toExplore.length) {
    step++;
    const newToExplore = [];
    for (let item of toExplore) {
      explored.add(item);
      const [x, y] = parseKey(item);
      for (let [dx, dy] of offsets) {
        const newX = x + dx;
        const newY = y + dy;
        const newKey = getKey(newX, newY);
        const cell = getCell(newX, newY);
        if (explored.has(newKey)) {
          continue;
        }
        if (cell === "#" || cell === " ") {
          continue;
        }
        if (cell.match(/[A-Z]+/)) {
          explored.add(newKey);
          result.push([cell, step]);
          continue;
        }
        newToExplore.push(newKey);

      }
    }
    toExplore = newToExplore;
  }
  return result;
};

const allPaths = {};
for (let item of Object.keys(portals)) {
  allPaths[item] = explore(portals[item]);
}
const findLowestPath = (path) => {
  let pos = path[path.length -1];
  if (pos === "ZZ") {
    return 0;
  }
  let warpCost = 0;
  if (pos !== "AA") {
    pos = pos.endsWith("2") ? pos.slice(0, 2) : pos + "2";
    warpCost = 1;
  }
  const possibles = allPaths[pos].filter(el => !path.includes(el[0]));

  const costs = [];
  for (let [pos, cost] of possibles) {
    costs.push(cost + findLowestPath([...path, pos]));
  }
  const res = Math.min(...costs);
  return res + warpCost;
};

console.log(findLowestPath(["AA"]));

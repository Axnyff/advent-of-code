const lines = require('fs').readFileSync('test-input').toString().trimEnd().split("\n").map(el => el.split(""));

const portals = {};

const getCell = (i, j) => {
  return lines[i]?.[j] || "_";
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
        const isOuter = i === 1 || j === 1 || i === lines.length - 2 || j === line.length - 2;
        const otherLetter = neighbours.find(el => el[2].match(/[A-Z]/));
        let portal = (cell + otherLetter[2]).split("").sort().join("") + (isOuter ? "Outer": "Inner");
        portals[portal] = getKey(correctNeighbourg[0], correctNeighbourg[1]);
        lines[correctNeighbourg[0]][correctNeighbourg[1]] = portal;
        lines[otherLetter[0]][otherLetter[1]] = " ";
        lines[i][j] = " ";
      }
    }
  });
});

const equivalent = (pos) => { if (pos === "AAOuter") { return pos} return pos.endsWith("Inner") ? pos.replace("Inner", "Outer") : pos.replace("Outer", "Inner");}

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
      const [x, y, level] = parseKey(item);
      for (let [dx, dy] of offsets) {
        const newX = x + dx;
        const newY = y + dy;
        const newKey = getKey(newX, newY);
        const cell = getCell(newX, newY);
        if (cell === "#" || cell === " " || cell === "_" || level > 50) {
          continue;
        }
        if (cell === ".") {
          if (explored.has(`${newKey},${level}`)) {
            continue;
          } else {
            newToExplore.push(`${newKey},${level}`);
            continue;
          }
        }
        if (cell.match(/[A-Z]+/)) {
          if (cell.startsWith("AA")) {
            continue;
          }
          if (cell === "ZZOuter" && level === 0) {
            result.push(step);
            continue;
          }
          if (level === 0 && cell.endsWith('Outer')) {
            continue;
          }
          let newNewKey = portals[equivalent(cell)];
          if (cell.endsWith('Inner')) {
            const toPush = `${newNewKey},${level + 1}`;
            if (!explored.has(toPush)) {
              newToExplore.push(toPush);
            }
          } else {
            const toPush = `${newNewKey},${level - 1}`;
            if (!explored.has(toPush)) {
              newToExplore.push(toPush);
            }
          }

        }
      }
    }
    toExplore = newToExplore;
  }
  return result;
};


console.log(explore(`${portals.AAOuter},0`));

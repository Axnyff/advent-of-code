const fs = require("fs");
const allowed = new Set();

const key = (x, y) => `${x},${y}`;
const unkey = (s) => s.split(",").map(Number);
let start;
let end;
fs.readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .forEach((l, y) => {
    l.split("").forEach((c, x) => {
      if (c === "S") {
        start = key(x, y);
      }
      if (c === "E") {
        end = key(x, y);
      }
      if (c !== "#") {
        allowed.add(key(x, y));
      }
    });
  });

const path = [start];

while (!path.includes(end)) {
  const current = path[path.length - 1];
  const [x, y] = unkey(current);
  const possibles = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  const possible = possibles.find((p) => {
    const k = key(...p);
    return allowed.has(k) && !path.includes(k);
  });
  path.push(key(...possible));
}
const cheats = [];
const manhattan = ([x1, y1], [x2, y2]) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

for (let i = 0; i < path.length - 1; i++) {
  for (let j = i + 1; j < path.length; j++) {
    const p1 = unkey(path[i]);
    const p2 = unkey(path[j]);
    if (manhattan(p1, p2) === 2 && j - i > 2) {
      cheats.push([p1, p2, j - i - 2]);
    }
  }
}
console.log(cheats.filter(c => c[2] >= 100).length)

const res = {};
cheats.forEach(c => {
  res[c[2]] = (res[c[2]] || 0 ) + 1
});

const fs = require("fs");
const lines = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split(""));
const allowed = new Set();

const key = (x, y) => `${x},${y}`;
const unkey = (s) => s.split(",").map(Number);

let start;
let end;
lines.forEach((l, y) => {
  l.forEach((c, x) => {
    if (c !== "#") {
      allowed.add(key(x, y));
    }
    if (c === "S") {
      start = key(x, y);
    }
    if (c === "E") {
      end = key(x, y);
    }
  });
});

let min = Infinity;
let bestTiles = [];
let toExplore = new Map();
toExplore.set(start, [[0, 0, [start]]]);
let best = new Map();
best.set(`${start},0`, 0);

const mapDir = (x, y, dir) => {
  if (dir === 0) {
    return [x + 1, y];
  }
  if (dir === 2) {
    return [x - 1, y];
  }
  if (dir === 3) {
    return [x, y - 1];
  }
  if (dir === 1) {
    return [x, y + 1];
  }
};
// return;
let i = 0;
while (toExplore.size) {
  let newToExplore = new Map();
  for (let [k, entries] of toExplore.entries()) {
    i++;
    const [x, y] = unkey(k);
    for (let [dir, score, tiles] of entries) {
      best.set(`${k},${dir}`, score);
      const possibles = [
        [
          mapDir(x, y, dir),
          dir,
          score + 1,
          tiles.concat([key(...mapDir(x, y, dir))]),
        ],
        [[x, y], (dir + 1) % 4, score + 1000, tiles],
        [[x, y], (dir + 3) % 4, score + 1000, tiles],
      ];
      for (let [newPosition, newDir, newScore, newTiles] of possibles) {
        const [newX, newY] = newPosition;
        if (key(newX, newY) === end) {
          if (newScore === min) {
            bestTiles = bestTiles.concat(newTiles);
          } else if (newScore < min) {
            min = Math.min(newScore, min);
            bestTiles = newTiles;
          }
        }
        if (newScore > min) {
          continue;
        }
        if (
          allowed.has(key(newX, newY)) &&
          (!best.has(`${newX},${newY},${newDir}`) ||
            best.get(`${newX},${newY},${newDir}`) > newScore)
        ) {
          if (!newToExplore.get(key(newX, newY))) {
            newToExplore.set(key(newX, newY), []);
          }
          newToExplore.get(key(newX, newY)).push([newDir, newScore, newTiles]);
        }
      }
    }
  }

  toExplore = newToExplore;
}

console.log(new Set(bestTiles).size);

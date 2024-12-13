const map = {};
const key = (x, y) => x + "-" + y;
const unkey = k => k.split("-").map(Number);

const trailheads = [];
require("fs").readFileSync("input").toString().trim().split("\n").forEach((l, y) => {
  l.split("").forEach((c, x) => {
    map[key(x, y)] = Number(c);
    if (c === "0") {
      trailheads.push([x, y]);
    }
  });
});

const computeTrailheadScore = (start) => {
  let value = 0;
  let paths = new Set([key(...start)]);

  while (value < 9 || paths.length === 0) {
    value++;
    let newPaths = new Set();
    for (let k of paths) {
      const [x, y] = unkey(k);
      for (let [x2, y2] of [[x + 1, y], [x -1, y], [x, y +1], [x, y - 1]]) {
        if (map[key(x2, y2)] === value) {
          newPaths.add(key(x2, y2));
        }
      }
    }
    paths = newPaths;
  }
  return paths.size;
};

const computeTrailheadRating = (start) => {
  let value = 0;
  let paths = [start];

  while (value < 9 || paths.length === 0) {
    value++;
    let newPaths = [];
    for (let [x, y] of paths) {
      for (let [x2, y2] of [[x + 1, y], [x -1, y], [x, y +1], [x, y - 1]]) {
        if (map[key(x2, y2)] === value) {
          newPaths.push([x2, y2])
        }
      }
    }
    paths = newPaths;
  }
  return paths.length;
};

console.log(trailheads.map(computeTrailheadScore).reduce((a, b) => a + b));
console.log(trailheads.map(computeTrailheadRating).reduce((a, b) => a + b));

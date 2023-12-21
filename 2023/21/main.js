let start;
const plot = {};
const key = (...args) => args.join(",");
require("fs").readFileSync("input").toString().slice(0, -1).split("\n").forEach((l, y) => {
  l.split("").forEach((c, x) => {
    if (c === "S") {
      start = key(x, y);
      plot[key(x, y)] = ".";
    } else {
      plot[key(x, y)] = c;
    }
  });
});

let parseKey = (key) => key.split(",").map(Number);

let toExplore = new Set([start]);
let values = [];
for (let i = 1; i <= 131 * 2 + 65; i++) {
  let newToExplore = new Set();
  for (let item of toExplore) {
    const [x, y] = parseKey(item);
    for (let [xd, yd] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      let k = key((x + xd + 131) % 131 , (y + yd + 131) % 131);
      if (plot[k] === ".") {
        k = key(x + xd, y + yd);
        newToExplore.add(k);
      }
    }
  }
  toExplore = newToExplore;
  if (i === 64) {
    console.log(toExplore.size);
  }
  if (i % 131 === 65) {
    console.log(i, (i-65)/131, toExplore.size);
    values.push(toExplore.size);
  }
}

let steps = (26501365 - 65) / 131;
values[2] -= values[1];
values[1] = values[1] - values[0];
values[2] -= values[1];

console.log(values[0] + values[1] * steps + values[2] * steps * (steps -1) / 2);

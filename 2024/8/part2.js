const lines = require("fs")
  .readFileSync("input")
  .toString()
  .trim()
  .split("\n");

const key = (i, j) => i + "-" + j;
const map = {};
const cols = lines.length - 1;
let rows = 0;

const chars = {};

const unkey = (k) => k.split("-").map(Number);

lines.forEach((l, j) => {
  l.split("").forEach((e, i) => {
    map[key(i, j)] = e;
    rows = Math.max(rows, j);

    if (e !== ".") {
      chars[e] = chars[e] || [];
      chars[e].push(key(i, j));
    }
  });
});
const antinodes = {};

for (let [k, items] of Object.entries(chars)) {
  for (let i = 0; i < items.length; i++) {
    antinodes[items[i]] = "#";
    for (let j = i + 1; j < items.length; j++) {
      const [x, y] = unkey(items[i]);
      const [x2, y2] = unkey(items[j]);

      const diffX = x - x2;
      const diffY = y - y2;

      let count = 1;
      while (true) {
        const x3 = x2 - diffX * count;
        const y3 = y2 - diffY * count;
        if (x3 <= rows && y3 <= cols && x3 >= 0 && y3 >= 0) {
          antinodes[key(x3,y3)] = "#";
          count++;
        } else {
          break;
        }
      }



      count = 1;
      while (true) {
        const x4 = x + diffX * count;
        const y4 = y + diffY * count;
        if (x4 <= rows && y4 <= cols && x4 >= 0 && y4 >= 0) {
          antinodes[key(x4,y4)] = "#";
          count++;
        } else {
          break;
        }
      }
    }
  }
}
console.log(Object.keys(antinodes).length);

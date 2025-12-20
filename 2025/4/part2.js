const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split(""));

const map = {};

let x_max = 0;
let y_max = 0;
lines.forEach((line, x) => {
  if (x > x_max) {
    x_max = x;
  }
  line.forEach((c, y) => {
    if (y > y_max) {
      y_max = y;
    }
    if (c === "@") {
      map[`${y}_${x}`] = true;
    }
  });
});

let total = 0;
let hasRemoved = true;
while (hasRemoved) {
  hasRemoved = false;
  for (let i = 0; i <= y_max; i++) {
    for (let j = 0; j <= x_max; j++) {
      if (!map[`${i}_${j}`]) {
        continue;
      }
      const items = [
        [i - 1, j],
        [i - 1, j - 1],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i + 1, j + 1],
      ].filter(([x, y]) => map[`${x}_${y}`]);
      if (items.length < 4) {
        total += 1;
        hasRemoved = true;
        map[`${i}_${j}`] = false;
      }
    }
  }
}
console.log(total);

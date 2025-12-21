const positions = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split(",").map(Number));

const areas = [];
for (let i = 0; i < positions.length - 1; i++) {
  const [x, y] = positions[i];
  for (let j = i + 1; j < positions.length; j++) {
    const [x2, y2] = positions[j];
    areas.push((Math.abs(x - x2) + 1) * (1 + Math.abs(y - y2)));
  }
}
console.log(areas.sort((a, b) => b - a)[0]);

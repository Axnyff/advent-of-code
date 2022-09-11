const fs = require("fs");

let maxX = 0;
let maxY = 0;
const nodes = fs
  .readFileSync("input")
  .toString()
  .split("\n")
  .slice(2, -1)
  .map((rawNode) => {
    const parts = rawNode.split(/\s+/);
    const name = parts[0].slice(15);
    const [x, y] = name.split("-");
    maxX = Math.max(parseInt(x.slice(1)), maxX);
    maxY = Math.max(parseInt(y.slice(1)), maxY);
    return {
      x: parseInt(x.slice(1)),
      y: parseInt(y.slice(1)),
      name: parts[0].slice(15),
      used: parseInt(parts[2].slice(0, -1)),
      avail: parseInt(parts[3].slice(0, -1)),
    };
  });

for (let y = 0; y <= maxY; y++) {
  let s = "";
  for (let x = 0; x <= maxX; x++) {
    const node = nodes.find(node => node.x === x && node.y ===y);

    if (node.used === 0) {
      s = s + "_";
    } else if (node.used > 90) {
      s = s + "X";
    } else {
      s = s + ".";
    }
  }
  console.log(s);
}

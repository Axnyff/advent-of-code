const input = require("fs").readFileSync("input").toString().slice(1, -2);

const diffs = {
  W: [-1, 0],
  E: [1, 0],
  N: [0, -1],
  S: [0, 1],
};

let x = 0;
let y = 0;
const positions = [];

let prevX = 0;
let prevY = 0;
const distances = {"0,0": 0}

const key = (x, y) => x + "," + y;
for (let char of input) {
  if (char === "(") {
    positions.push([x, y]);
  } else if (char === "|") {
    ([x, y] = positions[positions.length -1]);
  } else if (char === ")") {
    ([x, y] = positions.pop());
  } else {
    const [diffX, diffY] = diffs[char];
    x += diffX;
    y += diffY;
    const k = key(x, y);
    const kPrev = key(prevX, prevY);
    if (distances[k]) {
      console.log(x, y);
      distances[k] = Math.min(distances[k], distances[kPrev] + 1);
    } else {
      distances[k] = distances[kPrev] + 1;
    }
  }
  prevX = x;
  prevY = y;
}

console.log(Math.max(...Object.values(distances)));
console.log(Object.values(distances).filter(l => l >= 1000).length)

const input = require("fs").readFileSync("test-input").toString().slice(1, -2);

const diffs = {
  W: [-1, 0],
  E: [1, 0],
  N: [0, -1],
  S: [0, 1],
};

const x = 0;
const y = 0;
const positions = [];

const prevX = 0;
const prevY = 0;
const distances = {}

const key = (x, y) => x + "," + y;
for (let char of input) {
  if (char === "(") {
    positions.push([x, y]);
  } else if (char === "|") {
    ([x, y] = positions[-1]);
  } else if (char === ")") {
    ([x, y] = positions.pop());
  } else {
    const [diffX, diffY] = diffs[char];
    x += diffX;
    y += diffX;
    const k = key(x, y);
    const kPrev = key(prevX, prevY);
    if (distances[k]) {
      distances[k] = Math.min(distances[k], distances[kPrev] + 1);
    } else {
      distances[k] = distances[kPrev] + 1;
    }
    prevX = x;
    prevY = x;
  }
}
console.log(Math.max(Object.values(distances)));

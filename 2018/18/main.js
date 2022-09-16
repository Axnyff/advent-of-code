const fs = require('fs');

const input = fs.readFileSync('input').toString().slice(0, -1).split('\n');

const stored = new Set();
const target = 628;

const states = {};
const nextState = (current, it) => {
  if (states[current.join("")]) {
    console.log(states[current.join("")], it)
  }
  states[current.join("")] = it;
  const result = [];
  for (let y = 0; y < current.length; y++) {
    const newLine = [];
    const line = current[y];
    for (let x = 0; x < line.length; x++) {
      const acre = line[x];
      const adjacents = 
        [
          current?.[y - 1]?.[x - 1],
          current?.[y - 1]?.[x],
          current?.[y - 1]?.[x + 1],
          current?.[y]?.[x - 1],
          current?.[y]?.[x + 1],
          current?.[y + 1]?.[x - 1],
          current?.[y + 1]?.[x],
          current?.[y + 1]?.[x + 1],
        ];
      if (acre === ".") {
        if (adjacents.filter(el => el === "|").length >= 3) {
          newLine.push("|");
        } else {
          newLine.push(".");
        }
      }
      if (acre === "|") {
        if (adjacents.filter(el => el === "#").length >= 3) {
          newLine.push("#");
        } else {
          newLine.push("|");
        }
      }
      if (acre === "#") {
        if (adjacents.filter(el => el === "#").length >= 1 
          && adjacents.filter(el => el === "|").length >= 1
        ) {
          newLine.push("#");
        } else {
          newLine.push(".");
        }
      }
    }
    result.push(newLine.join(""));
  }

  return result;
};

const computeValue = (state) => {
  const joined = state.flatMap(line => line.split(""));
  return joined.filter(el => el === "|").length * joined.filter(el => el === "#").length;
};
let state = input;
1000 - 627;
100
console.log((1000000000 - 600)/ 28)
console.log(35714264 * 28);
for (let i = 0; i < 608; i++ ) {
  state = nextState(state, i);
}
console.log(computeValue(state));


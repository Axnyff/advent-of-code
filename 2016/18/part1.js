const getKey = (x, y) => `${x}-${y}`;

const testing = false;
const input = testing ?  ".^^.^.^^^^" :
".^^^.^.^^^.^.......^^.^^^^.^^^^..^^^^^.^.^^^..^^.^.^^..^.^..^^...^.^^.^^^...^^.^.^^^..^^^^.....^....";

const trap = {};

input.split("").forEach((tile, col) => {
  if (tile === "^") {
    trap[getKey(col, 0)] = true;
  }
})


const NB_ROWS = testing ? 10 : 40;
for (let row = 1; row < NB_ROWS; row++) {
  for (let col = 0; col < input.length; col++) {
    const trappedLeft = trap[getKey(col -1, row -1)];
    const trappedCenter = trap[getKey(col, row -1)];
    const trappedRight = trap[getKey(col + 1, row - 1)];

    if (trappedLeft && trappedCenter && !trappedRight) {
      trap[getKey(col, row)] = true;
    }
    if (!trappedLeft && trappedCenter && trappedRight) {
      trap[getKey(col, row)] = true;
    }
    if (trappedLeft && !trappedCenter && !trappedRight) {
      trap[getKey(col, row)] = true;
    }

    if (!trappedLeft && !trappedCenter && trappedRight) {
      trap[getKey(col, row)] = true;
    }
  }
}

for (let row = 0; row < NB_ROWS; row++) {
  let s = "";
  for (let col = 0; col < input.length; col++) {
    s += trap[getKey(col, row)] ? "^" : ".";
  }
  console.log(s);
}

console.log(input.length * NB_ROWS - Object.keys(trap).length);

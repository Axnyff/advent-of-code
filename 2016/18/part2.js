const getKey = (x, y) => `${x}-${y}`;

const testing = false;
const input = testing ?  ".^^.^.^^^^" :
".^^^.^.^^^.^.......^^.^^^^.^^^^..^^^^^.^.^^^..^^.^.^^..^.^..^^...^.^^.^^^...^^.^.^^^..^^^^.....^....";

let trap = {};

input.split("").forEach((tile, col) => {
  if (tile === "^") {
    trap[getKey(col, 0)] = true;
  }
})


let trap_count = Object.keys(trap).length;
const NB_ROWS = testing ? 10 : 400000;
for (let row = 1; row < NB_ROWS; row++) {
  const new_trap = {};
  for (let col = 0; col < input.length; col++) {
    const trappedLeft = trap[getKey(col -1, row -1)];
    const trappedCenter = trap[getKey(col, row -1)];
    const trappedRight = trap[getKey(col + 1, row - 1)];

    if (trappedLeft !== trappedRight) {
      trap_count++;
      new_trap[getKey(col, row)] = true;
    }
  }
  trap = new_trap;
}

console.log(input.length * NB_ROWS - trap_count);

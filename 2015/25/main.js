const row = 2947;
const column = 3029;

// const row = 5;
// const column = 2;

const targetRow = column + row - 1;
let targetIndex = targetRow * (targetRow + 1) / 2 + 1 - row;

let number = 20151125;
while (--targetIndex) {
  number = (number * 252533) % 33554393;
}
console.log(number);

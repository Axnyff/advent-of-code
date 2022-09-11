const fs = require('fs');
const operations = fs.readFileSync('input').toString().split('\n').slice(0, -1);

const swapPosition = (s, a, b) => {
  const data = s.split("");
  const temp = data[a];
  data[a] = data[b];
  data[b] = temp;
  return data.join("");
};

const swapLetter = (s, a, b) => {
  return s.replace(a, "_").replace(b, a).replace("_", b);
};

const rotateRight = (s, count) => {
  return s.slice(-(count % s.length)) + s.slice(0, -(count % s.length));
};
const rotateLeft = (s, count) => {
  return s.slice(count % s.length) + s.slice(0, count % s.length)
};

const rotateBased = (s, letter) => {
  const index = s.indexOf(letter);
  const count = index >= 4 ? index + 2:  index + 1;
  return rotateRight(s, count);
};

const rotateBasedReverse = (s, letter) => {
  const index = s.indexOf(letter);
  let count = index + 2;
  if ([1].includes(index)) {
    count = index + 8;
  }
  if ([3].includes(index)) {
    count = index + 7;
  }
  if ([6].includes(index)) {
    count = index + 2;
  }
  if ([4].includes(index)) {
    count = index + 3;
  }
  if ([2].includes(index)) {
    count = index + 4;
  }
  if ([0].includes(index)) {
    count = index + 1;
  }
  if ([7].includes(index)) {
    count = index + 5;
  }
  if ([5].includes(index)) {
    count = index + 6;
  }
  return rotateLeft(s, count);
};

const reverseThrough = (s, a, b) => {
  return s.slice(0, a) + s.slice(a, b + 1).split("").reverse().join("") + s.slice(b + 1);
};

const move = (s, a, b) => {
  if (a < b) {
    return s.slice(0, a) + s.slice(a + 1, b + 1) + s[a] + s.slice(b + 1);
  }
  return s.slice(0, b) + s[a] + s.slice(b, a) + s.slice(a + 1);
};

const testOperations = [
  "swap position 4 with position 0",
  "swap letter d with letter b",
  "reverse positions 0 through 4",
  "rotate left 1 step",
  "move position 1 to position 4",
  "move position 3 to position 0",
  "rotate based on position of letter b",
  "rotate based on position of letter d",
]

const runOperation = (value, op) => {
  const parts = op.split(" ");
  if (op.startsWith('swap position')) {
    const match = op.match(/(\d)/g);
    return swapPosition(value, parseInt(match[0]), parseInt(match[1]));
  }
  if (op.startsWith('swap letter')) {
    return swapLetter(value, parts[2], parts[5]);
  }
  if (op.startsWith('reverse positions')) {
    return reverseThrough(value, parseInt(parts[2]), parseInt(parts[4]));
  }
  if (op.startsWith('rotate left')) {
    return rotateLeft(value, parseInt(parts[2]));
  }
  if (op.startsWith('rotate right')) {
    return rotateRight(value, parseInt(parts[2]));
  }
  if (op.startsWith('move')) {
    return move(value, parseInt(parts[2]), parseInt(parts[5]));
  }
  if (op.startsWith('rotate based')) {
    return rotateBased(value, parts[6]);
  }
};

const runReverseOperation = (value, op) => {
  const parts = op.split(" ");
  if (op.startsWith('swap position')) {
    const match = op.match(/(\d)/g);
    return swapPosition(value, parseInt(match[0]), parseInt(match[1]));
  }
  if (op.startsWith('swap letter')) {
    return swapLetter(value, parts[2], parts[5]);
  }
  if (op.startsWith('reverse positions')) {
    return reverseThrough(value, parseInt(parts[2]), parseInt(parts[4]));
  }
  if (op.startsWith('rotate left')) {
    return rotateRight(value, parseInt(parts[2]));
  }
  if (op.startsWith('rotate right')) {
    return rotateLeft(value, parseInt(parts[2]));
  }
  if (op.startsWith('move')) {
    return move(value, parseInt(parts[5]), parseInt(parts[2]));
  }
  if (op.startsWith('rotate based')) {
    return rotateBasedReverse(value, parts[6]);
  }
};

let value = "gahedfcb";
for (let op of operations) {
  value = runOperation(value, op);
}
console.log(value);

let endValue = "fbgdceah";
for (let op of operations.slice().reverse()) {
  endValue = runReverseOperation(endValue, op);
}
console.log(endValue);

const data = require('fs').readFileSync('test-input').toString().slice(0, -1).split("\n\n").map(lines =>
  lines.split("\n").map(eval));

let total = 0;

const compare = (left, right) => {


};

for (let i = 0; i < data.length; i++) {
  const [left, right] = data[i];
  if (compare(left, right)) {
    total += i + 1;
  }
}

console.log(total);

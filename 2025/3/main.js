const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split("").map(Number));


let count = 2;

const runLines = (count) => {
  let total = 0;

  lines.forEach((line) => {
    const items = [];
    let maxIndex = 0;
    while (items.length < count) {
      let max = 0;
      for (i = maxIndex; i < line.length - count + items.length + 1; i++) {
        if (line[i] > max) {
          max = line[i];
          maxIndex = i + 1;
        }
      }
      items.push(max);
    }
    let value = 0;
    items.reverse().forEach((num, index) => {
      value += num * Math.pow(10, index);
    });
    total += value;
  });
  console.log(total);
};
runLines(2);
runLines(12);

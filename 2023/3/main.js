const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n");

let total = 0;
lines.forEach((line, lineIndex) => {
  let i = 0;
  while (i < line.length) {
    if (line[i]?.match(/\d/)) {
      let start = i;
      while (line[i]?.match(/\d/)) {
        i++;
      }
      let num = parseInt(line.slice(start, i));
      let hasAdjacent = false;

      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = start - 1; x <= i; x++) {
          if (lines[y]?.[x]?.match(/[^\d\.]/)) {
            hasAdjacent = true;
            break;
          }
        }
        if (hasAdjacent) {
          break;
        }
      }
      if (hasAdjacent) {
        total += num;
      }
    } else {
      i++;
    }
  }
});

// console.log(total);

const parseNum = (x, y) => {
  let start = x;
  let end = x;
  while (lines[y]?.[start]?.match(/\d/)) {
    start--;
  }
  while (lines[y]?.[end]?.match(/\d/)) {
    end++;
  }
  return [parseInt(lines[y].slice(start + 1, end)), end];
};

let total2 = 0;
lines.forEach((line, lineIndex) => {
  line.split("").forEach((c, i) => {
    if (c === "*") {
      let nums = [];
      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = i - 1; x <= i + 1; x++) {
          if (lines[y]?.[x]?.match(/\d/)) {
            let [num, xEnd] = parseNum(x, y);
            nums.push(num);
            x = xEnd;
          }
        }
      }
      console.log(nums);
      if (nums.length === 2) {
        total2 += nums.reduce((a, b) => a * b);
      }
    }
  });
});

console.log(total2);

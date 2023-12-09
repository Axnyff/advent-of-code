const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n").map(l => l.split(" ").map(Number));

let total = 0;
for (line of lines) {
  const allDiffs = [line];
  let diff = line;

  while (!diff.every(l => l === 0)) {
    diff = diff.slice(1).map((el, i) => el - diff[i]);
    allDiffs.push(diff);
  }

  total += allDiffs.reduce((t, l) => t + l[l.length - 1], 0);
}
console.log(total);

let total2 = 0;
for (line of lines) {
  const allDiffs = [line];
  let diff = line;

  while (!diff.every(l => l === 0)) {
    diff = diff.slice(1).map((el, i) => el - diff[i]);
    allDiffs.push(diff);
  }

  for (let i = allDiffs.length - 1; i >= 0; i--) {
    if (i === allDiffs.length - 1) {
      allDiffs[i].unshift(0);
    } else {
      allDiffs[i].unshift(allDiffs[i][0] - allDiffs[i + 1][0]);
    }
  }
  total2 += allDiffs[0][0];
}

console.log(total2);



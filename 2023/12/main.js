const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n").map(line => {
  const [pattern, raw_nbs] = line.split(" ");
  const nbs = raw_nbs.split(",").map(Number);
  return [pattern, nbs];
});

const patternMatch = (pattern, items) => {
  let groups = pattern.split(/[^#]+/).filter(l => l);
  return groups.length === items.length && groups.every((g, i) => g.length === items[i]);
};


const slowCountArrangements = (pattern, nbs) => {
  let possibles = [""];
  for (let c of pattern) {
    if (c === "?") {
      possibles = possibles.flatMap(c => [c + ".", c + "#"]);
    } else {
      possibles = possibles.map(a => a + c);
    }
  }
  return possibles.filter(p => patternMatch(p, nbs)).length;

};

const transformPattern = p => [p, p, p, p, p].join("?");
const transformNbs = nbs => [nbs, nbs, nbs, nbs, nbs].join(",").split(",").map(Number);

let memo = {};
const countArrangements = (pattern, nbs) => {
  if (memo[pattern + nbs.length] !== undefined) {
    return memo[pattern + nbs.length];
  }
  if (nbs.reduce((a, b) => a + b, 0) > pattern.split("").filter(el => el !== ".").length) {
    memo[pattern + nbs.length] = 0;
    return 0;
  }
  if (nbs.length === 0 && pattern.includes("#")) {
    memo[pattern + nbs.length] = 0;
    return 0;
  }
  if (nbs.length === 0 && !pattern.includes("#")) {
    memo[pattern + nbs.length] = 1;
    return 1;
  }
  if (nbs.length !== 0 && !pattern.includes("#") && !pattern.includes("?")) {
    memo[pattern + nbs.length] = 0;
    return 0;
  }
  let i = 0;
  while (pattern[i] === ".") {
    i++;
  }

  let cantMatch = false;
  for (let j = i; j < nbs[0] + i; j++) {
    if (pattern[j] === "." || !pattern[j]) {
      cantMatch = true;
      break;
    }
  }
  let res1 = 0;
  if (pattern[i + nbs[0]] !== "#" && !cantMatch) {
    res1 = countArrangements(pattern.slice(i + nbs[0] + 1), nbs.slice(1));
  }

  let res2 = 0;
  let value = pattern.slice(i, nbs[0]);
  if (pattern[i] === "?") {
    res2 = countArrangements(pattern.slice(i + 1), nbs);
  }
  memo[pattern + nbs.length] = res1 + res2;
  return res1 + res2;
};

const assert = (value, expected, label) => {
  if (value !== expected) {
    throw new Error(label +  ` ${value} !== ${expected}`);
  }
};

console.log(lines.reduce((total, line) => {
  memo = {};
  return total + countArrangements(...line)
},  0));

const countArrangementsExtanded = (line) => {
  memo = {};
  const [pattern, nbs] = line;
  return countArrangements(transformPattern(pattern), transformNbs(nbs));
};

memo = {};

console.log(lines.reduce((total, line) => {
  const [pattern, nbs] = line;
  return total + countArrangementsExtanded(line);
},  0));

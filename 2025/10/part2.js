const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((rawLine) => {
    const line = rawLine.split(" ");
    const end = line.pop();
    const [start, ...stuff] = line;

    const target = end.slice(1, -1).split(",").map(Number);

    const possibles = stuff.map((stuff) =>
      stuff.slice(1, -1).split(",").map(Number),
    );
    return {
      target,
      possibles,
    };
  });

const CACHE = true;
const findTarget = (finalTarget, possibles) => {
  let answer = 100000;
  const cache = {};
  const doFindTarget = (finalTarget, possibles) => {
    let string;
    if (CACHE) {
      string = JSON.stringify([finalTarget, possibles]);
      if (cache[string]) {
        return cache[string];
      }
    }
    if (finalTarget.every((el) => el === 0)) {
      return 0;
    }
    const target = finalTarget.map((el) => el % 2).join("");
    let matches = findMatches(target, possibles);

    const result = [];
    for (let [add, count] of matches.sort((a, b) => b.length - a.length)) {
      const newTarget = finalTarget.map((el, i) => (el - add[i]) / 2);

      if (newTarget.every((el) => el >= 0)) {
        answer = Math.min(
          answer,
          count + 2 * doFindTarget(newTarget, possibles),
        );
      }
    }
    if (finalTarget.every((el) => el % 2 === 0)) {
      const newTarget = finalTarget.map((el) => el / 2);
      answer = Math.min(answer, 2 * doFindTarget(newTarget, possibles));
    }
    if (CACHE) {
      cache[string] = answer;
    }
    return answer;
  };
  return doFindTarget(finalTarget, possibles);
};

const cache = {};
const findMatches = (target, possibles) => {
  let string;
  if (CACHE) {
    string = JSON.stringify([target, possibles]);
    if (cache[string]) {
      return cache[string];
    }
  }
  let alls = [[]];
  for (let possible of possibles) {
    const newAlls = [];
    for (let all of alls) {
      newAlls.push([...all, possible]);
      newAlls.push([...all]);
    }
    alls = newAlls;
  }
  alls = alls.filter((el) => el.length !== 0);

  const newAlls = [];
  for (let all of alls) {
    let result = Array.from(target, () => 0);
    for (item of all) {
      for (let num of item) {
        result[num] += 1;
      }
    }
    if (result.map((el) => el % 2).join("") === target) {
      newAlls.push([result, all.length]);
    }
  }
  if (CACHE) {
    cache[string] = newAlls;
  }
  return newAlls;
};

let total = 0;
let count = 0;
for (let line of lines.slice(11, 12)) {
  console.log(count++);
  const res = findTarget(line.target, line.possibles);
  total += res;
}
console.log(total);

const lines = require("fs")
  .readFileSync("test-input")
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

const findTarget = (finalTarget, possibles, acc = []) => {
  const target = finalTarget.map((el) => el % 2).join("");
  let matches = findMatches(target, possibles);

  const result = [];
  for (let [add, count] of matches.sort((a, b) => a.length - b.length)) {
    const newTarget = finalTarget.map((el, i) => (el - add[i]) / 2);
    console.log(newTarget, count)
    // if (newTarget.some(el => el < 0)) {
    //   continue;
    // }
    if (newTarget.every((el) => el === 0)) {
      result.push([...acc, count])
    }
    result.push(findTarget(newTarget, possibles, [...acc, count]));
  }
  return result;
};

const findMatches = (target, possibles) => {
  let alls = [[]];
  for (let possible of possibles) {
    const newAlls = [];
    for (let all of alls) {
      newAlls.push([...all, possible]);
      newAlls.push([...all]);
    }
    alls = newAlls;
  }
  alls = alls.filter(el => el.length !== 0)

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
  return newAlls;
};

let total = 0;
for (let line of lines) {
  const res = findTarget(line.target, line.possibles);
  console.log(JSON.stringify(res));
}
console.log(total);

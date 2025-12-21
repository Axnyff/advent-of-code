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
  let answer = 100000;
  const doFindTarget = (finalTarget, possibles, acc = []) => {
    if (finalTarget.every((el) => el === 0)) {
      console.log(acc);
      return 0;
    }
    const target = finalTarget.map((el) => el % 2).join("");
    let matches = findMatches(target, possibles);

    const result = [];
    console.log(matches);
    return;
    for (let [add, count] of matches.sort((a, b) => b.length - a.length)) {
      const newTarget = finalTarget.map((el, i) => (el - add[i]) / 2);

      if (newTarget.every((el) => el >= 0)) {
        answer = Math.min(
          answer,
          count +
            2 * doFindTarget(newTarget, possibles, [...acc, [finalTarget, newTarget]]),
        );
      }
    }
    return answer;
  };
  return doFindTarget(finalTarget, possibles);
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
  return newAlls;
};

let total = 0;
for (let line of lines.slice(2)) {
  const res = findTarget(line.target, line.possibles);
  console.log(JSON.stringify(res));
}
console.log(total);

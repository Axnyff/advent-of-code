const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((rawLine) => {
    const line = rawLine.split(" ");
    const end = line.pop();
    const [start, ...stuff] = line;

    const target = start
      .split("")
      .slice(1, -1)
      .flatMap((el, i) => (el === "#" ? [i] : []))
      .join("");
    const possibles = stuff.map((stuff) =>
      stuff.slice(1, -1).split(",").map(Number),
    );
    return {
      target,
      possibles,
    };
  });

const findTarget = (target, possibles) => {
  let steps = 0;

  let toExplore = new Set([""]);

  while (toExplore.size) {
    let newToExplore = new Set();
    steps++;
    for (let rawItem of toExplore) {
      const item = rawItem.split("").map(Number);
      for (possible of possibles) {
        const addedItem = item.filter((el) => !possible.includes(el));
        for (let val of possible) {
          if (!item.includes(val)) {
            addedItem.push(val);
          }
        }
        addedItem.sort((a, b) => a - b);
        const toAdd = addedItem.join("");
        if (toAdd === target) {
          return steps;
        }
        newToExplore.add(toAdd);
      }
    }
    toExplore = newToExplore;
  }
};
let total = 0;
for (let line of lines) {
  total += findTarget(line.target, line.possibles);
}
console.log(total);

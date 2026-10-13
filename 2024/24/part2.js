const fs = require("fs");

const [raw_init, raw_op] = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

const data = {};

const ops = raw_op.split("\n").map((l) => {
  const [a, op, b, _, dir] = l.split(" ");
  return {
    a,
    op,
    b,
    dir,
  };
});

ops.sort((opA, opB) => {
  if (opA.a.startsWith("x") || opA.a.startsWith("y")) {
    if (opB.a.startsWith("y") || opB.a.startsWith("x")) {
      return Number(opA.a.slice(1, 3)) - Number(opB.a.slice(1, 3));
    }
    return -1;
  }
  if (opB.a.startsWith("y") || opB.a.startsWith("x")) {
    return 1;
  }
  return 0;
});

let weird = new Set();
const calculateValue = (x, y) => {
  const realX = x.toString(2).padStart(45, "0");
  const realY = x.toString(2).padStart(45, "0");
  const data = {};
  for (let i = 0; i < 45; i++) {
    const index = String(i).padStart(2, "0");
    data["x" + index] = realX.slice(45 - i - 1, 45 - i) === "0" ? 0 : 1;
    data["y" + index] = realX.slice(45 - i - 1, 45 - i) === "0" ? 0 : 1;
  }

  let toBeCalculated = new Set(ops);
  while (toBeCalculated.size) {
    let newToBeCalculated = new Set();
    for (let item of toBeCalculated) {
      if (data[item.a] !== undefined && data[item.b] !== undefined) {
        switch (item.op) {
          case "AND":
            data[item.dir] = Number(data[item.a] + data[item.b] === 2);
            break;
          case "OR":
            data[item.dir] = Number(data[item.a] + data[item.b] >= 1);
            break;
          case "XOR":
            data[item.dir] = Number(data[item.a] + data[item.b] === 1);
            break;
        }
      } else {
        newToBeCalculated.add(item);
      }
    }
    toBeCalculated = newToBeCalculated;
  }

  const result = Object.entries(data)
    .filter(([k]) => k.startsWith("z"))
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([_, v]) => v)
    .join("");

  if (x + y !== parseInt(result, 2)) {
    console.log(x, y, x + y, result, parseInt(result, 2));
  }
};

for (let i = 0; i < 100; i++) {

  for (let j = 0; j < 100; j++) {
    calculateValue(i, j);
  }
}

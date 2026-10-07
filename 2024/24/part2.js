const fs = require("fs");

const [raw_init, raw_op] = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

const data = {};

raw_init.split("\n").forEach((l) => {
  const [name, value] = l.split(": ");
  //data[name] = Number(value);
  if (name.endsWith("04")) {
    data[name] = 1;
  } else {
    data[name] = 0;
  }
});

const ops = raw_op.split("\n").map((l) => {
  const [a, op, b, _, dir] = l.split(" ");
  return {
    a,
    op,
    b,
    dir,
  };
});

const calculateValue = (index) => {

  raw_init.split("\n").forEach((l) => {
    const [name, value] = l.split(": ");
    //data[name] = Number(value);
    if (name.endsWith(String(index).padLeft(0))) {
      data[name] = 1;
    } else {
      data[name] = 0;
    }
  });

};

let toBeCalculated = new Set(ops);
while (toBeCalculated.size) {
  let newToBeCalculated = new Set();
  for (let item of toBeCalculated) {
    console.log(item);
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
  .map(([_, v]) => v);
console.log(result, parseInt(result.join(""), 2));

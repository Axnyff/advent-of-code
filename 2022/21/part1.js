const fs = require("fs");

const raw_data = fs.readFileSync("input").slice(0, -1).toString().split("\n");

const parseMonkey = (line) => {
  const items = line.split(" ");
  const name = items[0].slice(0, -1);
  if (items.length === 2) {
    return [name, Number(items[1])]
  }
  return [name, items.slice(1)];
};

const data = Object.fromEntries(raw_data.map(parseMonkey));

const resolve = (key) => {
  const target = data[key];
  if (typeof target === "number") {
    return target;
  }
  const [a, op, b] = target;
  switch(op) {
    case "+":
      return resolve(a) + resolve(b);
    case "-":
      return resolve(a) - resolve(b);
    case "*":
      return resolve(a) * resolve(b);
    case "/":
      return resolve(a) / resolve(b);
  }
}

console.log(resolve("root"));

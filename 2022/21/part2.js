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
    if (key === "humn") {
      return "X"
    }
    return target;
  }
  const [a, op, b] = target;
  if (key === "root") {
    return [resolve(a), resolve(b)];
  }
  const resA = resolve(a);
  const resB = resolve(b);

  if (typeof resA === "number" && typeof resB === "number") {
    switch (op) {
      case "+":
        return resA + resB;
      case "-":
        return resA - resB;
      case "*":
        return resA * resB;
      case "/":
        return resA / resB;
    }
  }
  return [resA, op, resB];
}

let [left, right] = resolve("root");

const simplify = (left, right) => {
  const [a, op, b] = left;
  if (typeof a !== "number") {
    switch (op) {
      case "+":
        return [a, right - b];
      case "-":
        return [a, right + b];
      case "*":
        return [a, right / b];
      case "/":
        return [a, right * b];
    }
  }
  switch (op) {
  case "+":
    return [b, right - a];
  case "-":
    return [b, a - right];
  case "*":
    return [b, right / a];
  case "/":
    return [b, a / right];
  }
};

while (left.some(l => Array.isArray(l))) {
  ([left, right] = simplify(left, right));
}
([left, right] = simplify(left, right));
console.log(right);

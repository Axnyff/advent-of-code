const input = require("fs").readFileSync("input").slice(0, -1).toString().split("\n");

const parseNumber = (s, mult = 1, cumul = 0) => {
  if (s === "") {
    return cumul;
  }
  const char = s[s.length - 1];
  let amount = 0;
  if (/\d/.test(char)) {
    amount = Number(char);
  }
  if (char === "-") {
    amount = -1;
  }
  if (char === "=") {
    amount = -2;
  }
  return parseNumber(s.slice(0, -1), mult * 5, amount * mult + cumul);
};

const translateFactor = (f) => {
  if (f === -2) {
    return "=";
  }
  if (f === -1) {
    return "-";
  }
  return f.toString();
};

const translateNumber = (n) => {
  let res = "";
  let mult = 1;
  while (Math.abs(n / mult) > 2) {
    mult *= 5;
  }
  while (true ) {
    const factor = Math.round(n / mult);
    n = n - mult * factor;
    res += translateFactor(factor);
    mult /= 5;
    if (mult === 0.2) {
      return res;
    }
  }
};

const numbers = input.map(s => parseNumber(s));
console.log(translateNumber(numbers.reduce((a, b) => a + b)));

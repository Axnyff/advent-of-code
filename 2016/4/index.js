const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);

const lineValue = (input) => {
  const value = parseInt(input.match(/\d+/)[0], 10);

  const letters = input
    .match(/[a-z-]+/)[0]
    .replace(/-/g, "")
    .split("")
    .sort((a, b) => (a >= b ? 1 : -1));

  const res = [];
  let curr = letters[0];
  let count = 1;
  for (let letter of letters.slice(1)) {
    if (letter === curr) {
      count++;
    } else {
      res.push([curr, count]);
      count = 1;
      curr = letter;
    }
  }

  res.push([curr, count]);
  const sorted = res.sort((a, b) => {
    if (b[1] !== a[1]) {
      return a[1] >= b[1] ? -1 : 1;
    }
    return a[0] >= b[0] ? 1 : -1;
  });

  const check = sorted
    .slice(0, 5)
    .map((el) => el[0])
    .join("");
  return check === input.slice(-6, -1) ? value : 0;
};

const part1 = async () => {
  const buff = await readFile("input");
  const lines = buff.toString().split("\n").slice(0, -1);
  console.log(lines.map(lineValue).reduce((a, b) => a + b));
};

const translate = (input) => {
  const value = parseInt(input.match(/\d+/)[0], 10);

  const letters = input
    .match(/[a-z-]+/)[0]
    .replace(/-/g, " ")
    .split("")
    .map((letter) => {
      if (letter == " ") {
        return letter;
      }
      return String.fromCharCode(
        97 + ((letter.charCodeAt(0) - 97 + value) % 26)
      );
    })
    .join("");
  return [letters, value];
};

const part2 = async () => {
  const buff = await readFile("input");
  const lines = buff.toString().split("\n").slice(0, -1);
  console.log(
    lines.map(translate).filter(([name]) => name.startsWith("northpole"))[0][1]
  );
};

const run = async () => {
  await part1();
  await part2();
};

run();

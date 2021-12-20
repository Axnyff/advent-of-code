const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const isTriangle = ([a, b, c]) => {
  return a + b > c && a + c > b && b + c > a;
};

const part1 = async () => {
  const buff = await readFile("input");
  const data = buff.toString();
  const lines = data
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " ").split(" "));
  const triangles = lines.map((line) => line.map((el) => parseInt(el, 10)));
  console.log(triangles.filter(isTriangle).length);
};

const part2 = async () => {
  const buff = await readFile("input");
  const data = buff.toString();
  const items = data.split("\n").map((line) =>
    line
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((el) => parseInt(el, 10))
  );
  let first = items.map((el) => el[0]);
  let second = items.map((el) => el[1]);
  let third = items.map((el) => el[2]);

  let count = 0;
  while (first.length) {
    if (isTriangle(first.slice(0, 3))) {
      count++;
    }
    first = first.slice(3);
  }
  while (second.length) {
    if (isTriangle(second.slice(0, 3))) {
      count++;
    }
    second = second.slice(3);
  }
  while (third.length) {
    if (isTriangle(third.slice(0, 3))) {
      count++;
    }
    third = third.slice(3);
  }

  console.log(count);
};

const run = async () => {
  await part1();
  await part2();
};

run();

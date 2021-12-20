const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);

const mostCommon = (list) => {
  const count = {};
  for (let el of list) {
    count[el] = (count[el] || 0) + 1;
  }
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
};

const leastCommon = (list) => {
  const count = {};
  for (let el of list) {
    count[el] = (count[el] || 0) + 1;
  }
  return Object.entries(count).sort((a, b) => a[1] - b[1])[0][0];
};
const part1 = async () => {
  const buff = await readFile("input");
  const data = buff.toString().split("\n").slice(0, -1);
  let res = "";
  for (let i in data[0]) {
    res += mostCommon(data.map((el) => el[i]));
  }
  console.log(res);
};

const part2 = async () => {
  const buff = await readFile("input");
  const data = buff.toString().split("\n").slice(0, -1);
  let res = "";
  for (let i in data[0]) {
    res += leastCommon(data.map((el) => el[i]));
  }
  console.log(res);
};

const run = async () => {
  await part1();
  await part2();
};

run();

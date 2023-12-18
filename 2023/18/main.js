let xMin = Infinity;
let xMax = -Infinity;
let yMin = Infinity;
let yMax = -Infinity;
const graph = {};
const key = (x, y) => x + "," + y;
const parseKey = (key) => key.split(",").map(Number);
let x = 0;
let y = 0;
const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");

const data1 = lines.map(l => {
  const item = l.split(" ");
  return [item[0], Number(item[1])];
});

const data2 = lines.map(l => {
  const item = l.split(" ")[2].slice(2, -1);
  let dir = "R";
  if (item.at(-1) === "1") {
    dir = "D"
  }
  if (item.at(-1) === "2") {
  dir = "L"
  }
  if (item.at(-1) === "3") {
    dir = "U"
  }
  return [dir, parseInt(item.slice(0, -1), 16)]
});

const getPoints = (data) => {
  let x = 0;
  let y = 0;
  let result = [];

  for (let item of data) {
    const [dir, amount] = item;
    if (dir === "L") {
      x -= amount;
    }
    if (dir === "R") {
      x += amount;
    }
    if (dir === "U") {
      y -= amount;
    }
    if (dir === "D") {
      y += amount;
    }
    result.push([x, y]);
  }
  return result;
};

const points1 = getPoints(data1);
const points2 = getPoints(data2);


const area = (polynom) => {
  let total = 0;

  for (let i = 0; i < polynom.length; i++) {
    total += polynom[i][0] * polynom[(i + 1) % polynom.length][1] - polynom[i][1] * polynom[(i + 1) % polynom.length][0]
  }
  return 0.5 * Math.abs(total);
};


const perimeter = (polynom) => {
  let total = 0;

  for (let i = 0; i < polynom.length; i++) {
    total += Math.abs(polynom[i][0] + polynom[i][1] - polynom[(i + 1) % polynom.length][0] - polynom[(i + 1) % polynom.length][1]);
  }
  return total;
}

console.log(perimeter(points1) / 2 +  1  + area(points1));
console.log(perimeter(points2) / 2 +  1  + area(points2));

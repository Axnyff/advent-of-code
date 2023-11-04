const plan = {};
const [lines, path] = require("fs").readFileSync("input").toString().slice(0, -1).split("\n\n");
const key = (x, y) => x + "," + y;

const getInstructions = () => {
  let i = 0;


};

const instructions = [...path.matchAll(/(\d+|R|L)/g)].map(el => el[0]).map(l => ["L", "R"].includes(l) ? l : Number(l));

let yMax = 0;
const xMax = lines.indexOf("\n");
lines.split("\n").forEach((l, y) => {
  yMax = y + 1;
  l.split("").forEach((c, x) => {
    if (c !== " ") {
      plan[key(x, y)] = c;
    }
  });
});

console.log(yMax, xMax);
const facings = [">", "v", "<", "^"];

let facing = ">";
let y = 0;
let x = 0;
while (!plan[key(x, y)]) {
  x++;
}

console.log("START");
for (let instruction of instructions) {
  console.log(x, y, facing);
  console.log(instruction);
  if (instruction === "L") {
    facing = facings[(facings.indexOf(facing) + 3) % 4];
  } else if (instruction === "R") {
    facing = facings[(facings.indexOf(facing) + 1) % 4];
  } else {
    switch (facing) {
      case ">":
        while (instruction > 0) {
          instruction--;
          let xN = x + 1;
          let yN = y;
          if (!plan[key(xN, yN)]) {
            xN = 0;
            while (!plan[key(xN, yN)]) {
              xN++;
            }
          }
          if (plan[key(xN, yN)] === "#") {
            break;
          }
          x = xN;
          y = yN;
        }
        break;
      case "v":
        while (instruction > 0) {
          instruction--;
          let xN = x;
          let yN = y + 1;
          if (!plan[key(xN, yN)]) {
            yN = 0;
            while (!plan[key(xN, yN)]) {
              yN++;
            }
          }
          if (plan[key(xN, yN)] === "#") {
            break;
          }
          x = xN;
          y = yN;
        }
        break;
      case "<":
        while (instruction > 0) {
          instruction--;
          let xN = x - 1;
          let yN = y;
          if (!plan[key(xN, yN)]) {
            xN = xMax;
            while (!plan[key(xN, yN)]) {
              xN--;
            }
          }
          if (plan[key(xN, yN)] === "#") {
            break;
          }
          x = xN;
          y = yN;
        }
        break;
      case "^":
        while (instruction > 0) {
          instruction--;
          let xN = x;
          let yN = y - 1;
          if (!plan[key(xN, yN)]) {
            yN = yMax;
            while (!plan[key(xN, yN)]) {
              yN--;
            }
          }
          if (plan[key(xN, yN)] === "#") {
            break;
          }
          x = xN;
          y = yN;
        }
        break;
    }
  }
}
console.log(x, y, facing);

console.log(1000 * (y + 1) + 4 * (x + 1) + facings.indexOf(facing));


const plot = {};

const key = (x, y) => x + "," + y;

let minY = Infinity;
let maxY = -Infinity;

let minX = Infinity;
let maxX = -Infinity;

require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .forEach((line) => {
    const [left, right] = line.split(", ");
    if (left.startsWith("x")) {
      const x = Number(left.slice(2));
      if (x > maxX) {
        maxX = x;
      }
      if (x < minX) {
        minX = x;
      }
      const [start, end] = right.slice(2).split("..");
      for (let i = Number(start); i <= Number(end); i++) {
        if (i > maxY) {
          maxY = i;
        }
        if (i < minY) {
          minY = i;
        }
        plot[key(x, i)] = "#";
      }
    } else {
      const y = Number(left.slice(2));
      const [start, end] = right.slice(2).split("..");
      if (y > maxY) {
        maxY = y;
      }
      if (y < minY) {
        minY = y;
      }
      for (let i = Number(start); i <= Number(end); i++) {
        if (i > maxX) {
          maxX = i;
        }
        if (i < minX) {
          minX = i;
        }
        plot[key(i, y)] = "#";
      }
    }
  });

const show = () => {
  for (let y = 0; y < maxY + 1; y++) {
    let line = `${y}`.padEnd(5, " ");
    for (let x = minX - 2; x <= maxX + 2; x++) {
      line = line + (plot[key(x, y)] || " ");
    }
    console.log(line);
  }
  let line = (maxY + 1).toString().padEnd(5, " ");
  for (let x = minX - 2; x <= maxX + 2; x++) {
    line = line + (x === 500 ? "!" : " ");
  }
  console.log(line);
};

const calls = [];
const fill = (x, y) => {
  let toExplore = new Set();
  toExplore.add("500,1");
  let explored = new Set();

  while (toExplore.size) {
    // const count = Object.values(plot).filter((l) => l === "|").length;
    let continues = 0;
    const newToExplore = new Set();
    for (let item of toExplore) {
      // console.log("GO");
      explored.add(item);
      let x = Number(item.split(",")[0]);
      let y = Number(item.split(",")[1]);
      if (y > maxY || y < 0) {
        continue;
      }
      plot[key(x, y)] = "|";
      if (!plot[key(x, y + 1)]) {
        newToExplore.add(key(x, y + 1));
      } else if (plot[key(x, y + 1)]) {
        if (plot[key(x, y + 1)] === "|") {
          let xLeft = x - 1;
          while (plot[key(xLeft, y + 1)] === "|") {
            // console.log(xLeft, y + 1);
            // console.log("finif");
            xLeft--;
          }
          if (plot[key(xLeft, y + 1)] !== "#") {
            continue;
          }
          let xRight = x + 1;
          while (plot[key(xRight, y + 1)] === "|") {
            // console.log(xRight, y + 1);
            // console.log("finif");
            xRight++;
          }
          if (plot[key(xRight, y + 1)] !== "#") {
            continue;
          }

          console.log(x, y);
          // return;
        }
        let canEscape = false;
        while (!canEscape) {
          plot[key(x, y)] = "|";
          let xLeft = x - 1;
          while (plot[key(xLeft, y)] !== "#" && plot[key(xLeft, y + 1)]) {
            plot[key(xLeft, y)] = "|";
            xLeft--;
          }
          if (!plot[key(xLeft, y + 1)]) {
            if (!explored.has(key(xLeft, y))) {
              newToExplore.add(key(xLeft, y));
            }
            canEscape = true;
          }
          let xRight = x + 1;
          while (plot[key(xRight, y)] !== "#" && plot[key(xRight, y + 1)]) {
            plot[key(xRight, y)] = "|";
            xRight++;
          }
          if (!plot[key(xRight, y + 1)]) {
            if (!explored.has(key(xRight, y))) {
              newToExplore.add(key(xRight, y));
            }
            canEscape = true;
          }
          y--;
        }
      } else if (plot[key(x, y + 1)] === "|") {
      }
    }
    toExplore = newToExplore;
  }
};

// show();
fill();
console.log(Object.values(plot).filter((l) => l === "|").length);
show();

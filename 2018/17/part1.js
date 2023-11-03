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
  for (let y = minY - 1; y < maxY + 1; y++) {
    let line = `${y}`.padEnd(3, " ");
    for (let x = minX - 2; x <= maxX + 2; x++) {
      line = line + (plot[key(x, y)] || " ");
    }
    console.log(line);
  }
  let line = (maxY + 1).toString().padEnd(3, " ");
  for (let x = minX - 2; x <= maxX + 2; x++) {
    line = line + (x === 500 ? "!" : " ")
  }
  console.log(line);
};

const calls = [];
const fill = (x, y) => {
  let toExplore = [[500, 1]];

  while (toExplore.length) {
    const newToExplore = [];
    for (let [x, y] of toExplore) {
      if (y > maxY) {
        continue;
      }
      plot[key(x, y)] = "|";
      if (!plot[key(x, y + 1)]) {
        newToExplore.push([x, y + 1]);
      } else if (plot[key(x, y + 1)] === "#") {
        let canEscape = false;
        while (!canEscape) {
          let xLeft = x - 1;
          while (!plot[key(xLeft, y)] && plot[key(xLeft, y + 1)]) {
            plot[key(xLeft, y)] = "|"
            xLeft--;
          }
          if (!plot[key(xLeft, y + 1)]) {
            toExplore.push([xLeft, y]);
            canEscape = true;
          }
          let xRight = x + 1;
          while (!plot[key(xRight, y)] && plot[key(xRight, y + 1)]) {
            plot[key(xRight, y)] = "|"
            xRight++;
          }
          if (!plot[key(xRight, y + 1)]) {
            toExplore.push([xRight, y]);
            canEscape = true;
          }
          y--;
        }
      } else if (plot[key(x, y + 1)] === "|") {

      }
    }
    toExplore = newToExplore;
  }

}

// show();
fill();
console.log(Object.values(plot).filter(l => l === "|").length);
show();

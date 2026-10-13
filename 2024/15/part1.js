const fs = require("fs");
const [raw_grid, raw_command] = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

let pos;
let grid = {};
const key = (x, y) => `${x},${y}`;
const unkey = (k) => k.split(",").map(Number);

raw_grid.split("\n").map((l, y) => {
  l.split("").map((c, x) => {
    if (c === "@") {
      pos = key(x, y);
      grid[key(x, y)] = ".";
    } else {
      grid[key(x, y)] = c;
    }
  });
});

const commands = raw_command.split("");

const printGrid = () => {
  raw_grid.split("\n").map((l, y) => {
    let s = "";
    l.split("").map((c, x) => {
      if (key(x, y) === pos) {
        s+= "@"
      } else {
        s += grid[key(x, y)];
      }
    });
    console.log(s);
  });
};

let i = 0;
outer: for (let command of commands) {
  const [x, y] = unkey(pos);
  i++;
  switch (command) {
    case "<": {
      const newKey = key(x - 1, y);
      if (grid[newKey] !== "#") {
        if (grid[newKey] === ".") {
          pos = newKey;
          break;
        }
        if (grid[newKey] === "O") {
          let newX = x - 2;
          while (grid[key(newX, y)] !== ".") {
            if (grid[key(newX, y)] === "#") {
              continue outer;
            }
            newX--;
          }
          pos = newKey;
          grid[pos] = ".";
          grid[key(newX, y)] = "O";
        }
      }
      break;
    }
    case ">": {
      const newKey = key(x + 1, y);
      if (grid[newKey] !== "#") {
        if (grid[newKey] === ".") {
          pos = newKey;
          break;
        }
        if (grid[newKey] === "O") {
          let newX = x + 2;
          while (grid[key(newX, y)] !== ".") {
            if (grid[key(newX, y)] === "#") {
              continue outer;
            }
            newX++;
          }
          pos = newKey;
          grid[pos] = ".";
          grid[key(newX, y)] = "O";
        }
      }
      break;
    }
    case "^": {
      const newKey = key(x, y - 1);
      if (grid[newKey] !== "#") {
        if (grid[newKey] === ".") {
          pos = newKey;
          break;
        }
        if (grid[newKey] === "O") {
          let newY = y - 2;
          while (grid[key(x, newY)] !== ".") {
            if (grid[key(x, newY)] === "#") {
              continue outer;
            }
            newY--;
          }
          pos = newKey;
          grid[pos] = ".";
          grid[key(x, newY)] = "O";
        }
      }
      break;
    }
    case "v": {
      const newKey = key(x, y + 1);
      if (grid[newKey] !== "#") {
        if (grid[newKey] === ".") {
          pos = newKey;
          break;
        }
        if (grid[newKey] === "O") {
          let newY = y + 2;
          while (grid[key(x, newY)] !== ".") {
            if (grid[key(x, newY)] === "#") {
              continue outer;
            }
            newY++;
          }
          pos = newKey;
          grid[pos] = ".";
          grid[key(x, newY)] = "O";
        }
      }
      break;
    }
  }
}

let score = 0;
raw_grid.split("\n").map((l, y) => {
  l.split("").map((c, x) => {
    if (grid[key(x, y)] === "O") {
      score += y * 100 + x;
    }
  });
});
console.log(score);

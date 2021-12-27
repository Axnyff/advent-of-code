const input = require("fs").readFileSync("input2").toString().trim().split("\n");

const getKey = (x, y) => `${x},${y}`;
const parseKey = (key) => key.split(",").map(Number);
let nbKeys = 0;

const start = [];

input.forEach((row, i) => {
  row.split("").forEach((cell, j) => {
    if (cell === "@") {
      start.push([i, j]);
    }
    if (cell.match(/[a-z]/)) {
      nbKeys++;
    }
  });
});

const offsets = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const getAccesibleKeys = (pos, collectedKeys = []) => {
  const result = [];
  let toExplore = [pos];
  let step = 0;
  const explored = new Set();
  while (toExplore.length) {
    const newToExplore = [];
    for (let currentPos of toExplore) {
      const [x, y] = parseKey(currentPos);
      if (input[x][y].match(/[a-z]/) && !collectedKeys.includes(input[x][y])) {
        result.push([currentPos, input[x][y], step]);
      }

      for (let [dx, dy] of offsets) {
        const value = input[x + dx]?.[y + dy] || "#";

        if (value !== "#") {
          if (value.match(/[A-Z]/)) {
            if (collectedKeys.includes(value.toLowerCase())) {
              if (!explored.has(getKey(x + dx, y + dy))) {
                explored.add(getKey(x + dx, y + dy));
                newToExplore.push(getKey(x + dx, y + dy));
              }
            }
          } else {
            if (!explored.has(getKey(x + dx, y + dy))) {
              explored.add(getKey(x + dx, y + dy));
              newToExplore.push(getKey(x + dx, y + dy));
            }
          }
        }
      }
    }
    toExplore = newToExplore;
    step++;
  }
  return result;
};

const serialize = (pos, collectedKeys) => {
  return `${pos.join("#")}-${collectedKeys.slice().sort().join("")}`;
};

const dp = {};

const solve = (pos, collectedKeys = []) => {
  console.log(pos);
  let initialKey = serialize(pos, collectedKeys);
  let result = [initialKey];
  dp[initialKey] = 0;
  let step = 0;

  while (step < nbKeys) {
    console.log(step);
    step++;
    const newToExplore = new Set();
    for (let item of result) {
      const [allRawPos, rawCollectedKeys = ""] = item.split("-");
      const allPos = allRawPos.split("#");
      const collectedKeys = rawCollectedKeys.split("");

      for (let i = 0; i < 4; i++) {
        const pos = allPos[i]
        for (let [newPos, collectedKey, steps] of getAccesibleKeys(
          pos,
          collectedKeys
        )) {
          const newAllPos = allPos.map((el, j) => {
            if (i === j) {
              return newPos;
            }
            return el;
          });
          let key = serialize(newAllPos, [...collectedKeys, collectedKey]);
          const nbStep = dp[item];
          newToExplore.add(key);
          dp[key] = Math.min(dp[key] || Infinity, steps + nbStep);
        }
      }
    }
    result = [...newToExplore];
  }
  console.log(Math.min(...result.map((el) => dp[el])));
};

solve(start.map(el => getKey(...el)));

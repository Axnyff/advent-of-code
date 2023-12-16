const graph = {};
const key = (x, y) => x + "," + y;
const parseKey = (key) => {
  const [x, y] = key.split(",");
  return [Number(x), Number(y)];
};

let xMax = 0;
let yMax = 0;

require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .forEach((l, y) => {
    if (y > yMax) {
      yMax = y;
    }
    l.split("").forEach((c, x) => {
      graph[key(x, y)] = c;
      if (x > xMax) {
        xMax = x;
      }
    });
  });

const showGraph = (items) => {
  for (let y = 0; y <= yMax; y++) {
    let line = "";
    for (let x = 0; x <= xMax; x++) {
      if (items && items.has(key(x, y))) {
        line += "#"
      } else {
        line += graph[key(x, y)]
      }
    }
    console.log(line);
  }
};

const dirs = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
]

const computeScore = (startBeam) => {
  let beams = [startBeam];
  const beamsRec = new Set();
  while (beams.length) {
    let newBeams = [];
    for (let beam of beams) {
      let [x, y, dirIndex] = beam;
      const addBeam = (x, y, dirIndex) => {
        if (!beamsRec.has(x + "," + y + "," + dirIndex)) {
          newBeams.push([x, y, dirIndex]);
        }
      };
      let c = graph[key(x, y)]
      let dir = dirs[dirIndex];
      if (c === undefined) {
        // out of bounds
        continue;
      }
      beamsRec.add(x + "," + y + "," + dirIndex);
      if (c === ".") {
        let xNew = x + dir[0];
        let yNew = y + dir[1];
        addBeam(xNew, yNew, dirIndex);
        continue;
      } else if (c === "|") {
        if (dirIndex === 1 || dirIndex === 3) {
          let xNew = x + dir[0];
          let yNew = y + dir[1];
          addBeam(xNew, yNew, dirIndex);
          continue;
        } else {
          addBeam(x, y + 1, 3);
          addBeam(x, y - 1, 1);
          continue;
        }
      } else if (c === "-") {
        if (dirIndex === 0 || dirIndex === 2) {
          let xNew = x + dir[0];
          let yNew = y + dir[1];
          addBeam(xNew, yNew, dirIndex);
          continue;
        } else {
          addBeam(x + 1, y, 0);
          addBeam(x - 1, y, 2);
          continue;
        }
      }
      if (c === "/") {
        if (dirIndex === 0) {
          addBeam(x, y -1, 1)
        }
        if (dirIndex === 1) {
          addBeam(x + 1, y, 0)
        }
        if (dirIndex === 2) {
          addBeam(x, y + 1, 3)
        }
        if (dirIndex === 3) {
          addBeam(x - 1, y, 2)
        }
        continue;
      }
      if (c === "\\") {
        if (dirIndex === 0) {
          addBeam(x, y + 1, 3)
        }
        if (dirIndex === 3) {
          addBeam(x + 1, y, 0)
        }
        if (dirIndex === 2) {
          addBeam(x, y - 1, 1)
        }
        if (dirIndex === 1) {
          addBeam(x - 1, y, 2)
        }
        continue;
      }
      throw Error("unhandled " + c);
    }
    beams = newBeams;
  }

  const items = new Set([...beamsRec].map(k => {
    const [x, y] = parseKey(k)
    return key(x, y);
  }));

  return items.size;
};
console.log(computeScore([0, 0, 0]));
let scoreMax = 0;

for (let y = 0; y <= yMax; y++) {
  let res = computeScore([0, y, 0]);
  if (res > scoreMax) {
    scoreMax = res;
  }
  res = computeScore([xMax, y, 2]);
  if (res > scoreMax) {
    scoreMax = res;
  }
}

for (let x = 0; x <= xMax; x++) {
  let res = computeScore([x, 0, 3]);
  if (res > scoreMax) {
    scoreMax = res;
  }
  res = computeScore([x, yMax, 1]);
  if (res > scoreMax) {
    scoreMax = res;
  }
}
console.log(scoreMax);

const codes = ["029A", "980A", "179A", "456A", "379A"];

const keypad = {
  7: [0, 0],
  8: [1, 0],
  9: [2, 0],
  4: [0, 1],
  5: [1, 1],
  6: [2, 1],
  1: [0, 2],
  2: [1, 2],
  3: [2, 2],
  0: [1, 3],
  A: [2, 3],
};

const typeFirstCode = (code) => {
  let currentKey = "A";
  let [x, y] = keypad[currentKey];

  const instructions = [];
  let i = 0;
  while (i < code.length) {
    let [targetX, targetY] = keypad[code[i]];
    while (targetY < y) {
      instructions.push("^");
      y--;
    }
    while (targetX > x) {
      instructions.push(">");
      x++;
    }
    while (targetY > y) {
      instructions.push("v");
      y++;
    }
    while (targetX < x) {
      instructions.push("<");
      x--;
    }
    instructions.push("A");
    i++;
  }
  return instructions.join("");
};

const keypad2 = {
  "^": [1, 0],
  A: [2, 0],
  "<": [0, 1],
  v: [1, 1],
  ">": [2, 1],
};

const typeSecondCode = (code) => {
  let currentKey = "A";
  let [x, y] = keypad2[currentKey];

  const instructions = [];
  let i = 0;
  while (i < code.length) {
    let [targetX, targetY] = keypad2[code[i]];
    while (targetY > y) {
      instructions.push("v");
      y++;
    }
    while (targetX > x) {
      instructions.push(">");
      x++;
    }
    while (targetY < y) {
      instructions.push("^");
      y--;
    }
    while (targetX < x) {
      instructions.push("<");
      x--;
    }
    instructions.push("A");
    i++;
  }
  return instructions.join("");
};

// v<<A>>^AvA^Av<<A>>^AAv<A<A>>^AAvAA^<A>Av<A>^AA<A>Av<A<A>>^AAAvA^<A>A
// v<<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A

const computeScore = (codes) => {
  let total = 0;
  for (let code of codes) {
    const num = parseInt(code.replace(/A/g, "").replace(/^0*/, ""));
    console.log(typeSecondCode(typeSecondCode(typeFirstCode(code))).join(""))
    const len = typeSecondCode(typeSecondCode(typeFirstCode(code))).length;
    console.log(num, len);
    total += len * num;
  }
  return total;
};

const tokey = (x, y) => `${x}-${y}`;
const unkey = k => k.split("-").map(Number)

const getPath = (x, y) => {
  if (x === 1) {
    return ">"
  }
  if (x === -1) {
    return "<"
  }
  if (y === -1) {
    return "^"
  }
  return "v";
};

const computePath = (start, end) => {
  let explored = new Set();
  let toExplore = new Map();
  let result = [];
  toExplore.set("", start);
  while (toExplore.size) {
    let newToExplore = new Map();
    for (let [path, pos] of toExplore) {
      let [x, y] = Object.entries(keypad).find(e => e[0] === pos)[1];
      for (let [diffx, diffy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        let newx = diffx + x;
        let newy = diffy + y;

        const newPos = Object.entries(keypad).find(e => e[1][0] === newx && e[1][1] === newy);
        if (newPos) {
          const newPath = path + getPath(diffx, diffy);
          if (newPos[0] === end) {
            result.push(newPath);
          } else {
            newToExplore.set(newPath, newPos[0]);
          }
        }

      }
    }
    toExplore = newToExplore;
    if (result.length) {
      return result;
    }
  }
};

const computePath2 = (start, end) => {
  let explored = new Set();
  let toExplore = new Map();
  let result = [];
  toExplore.set("", start);
  while (toExplore.size) {
    let newToExplore = new Map();
    for (let [path, pos] of toExplore) {
      let [x, y] = Object.entries(keypad2).find(e => e[0] === pos)[1];
      for (let [diffx, diffy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        let newx = diffx + x;
        let newy = diffy + y;

        const newPos = Object.entries(keypad2).find(e => e[1][0] === newx && e[1][1] === newy);
        if (newPos) {
          const newPath = path + getPath(diffx, diffy);
          if (newPos[0] === end) {
            result.push(newPath);
          } else {
            newToExplore.set(newPath, newPos[0]);
          }
        }

      }
    }
    toExplore = newToExplore;
    if (result.length) {
      return result;
    }
  }
};

const paths = {};
for (let start of Object.keys(keypad)) {
  for (let end of Object.keys(keypad)) {
    if (start !== end) {
      paths[start] = paths[start] || {}
      paths[start][end] = computePath(start, end);
      computePath
    }
  }
}

const paths2 = {};
for (let start of Object.keys(keypad2)) {
  for (let end of Object.keys(keypad2)) {
    if (start !== end) {
      paths2[start] = paths2[start] || {}
      paths2[start][end] = computePath2(start, end);
      computePath
    } else {
      paths2[start] = paths2[start] || {}
      paths2[start][end] = [""]
    }
  }
}

const getFirstCodes = (code) => {
  const trueCode = "A" + code;
  let possibles = [""];
  for (let i = 0; i < trueCode.length - 1; i++) {
    let res = paths[trueCode[i]][trueCode[i+1]]
    let newPossibles = [];
    for (let possible of possibles) {
      for (let path of res) {
        newPossibles.push(possible + path);
      }
    }
    possibles = newPossibles;
  }
  return possibles;
};

const getSecondCodes = (code) => {
  const trueCode = "A" + code;
  let possibles = [""];
  for (let i = 0; i < trueCode.length - 1; i++) {
    let res = paths2[trueCode[i]][trueCode[i+1]]
    let newPossibles = [];
    for (let possible of possibles) {
      for (let path of res) {
        newPossibles.push(possible + path + "A");
      }
    }
    possibles = newPossibles;
  }
  return possibles;
};

const getShortest = (code) => {
  const start = getFirstCodes(code);
  console.log(start);
  const result = [];
  for (let path of start) {
    console.log(path);
    result.push(...getSecondCodes(path));
  }

  console.log(result);
  const result2 = [];
  for (let path of result) {
    result2.push(...getSecondCodes(path));
  }
  const result3 = [];
  for (let path of result2) {
    result3.push(...getSecondCodes(path));
  }
  return Math.min(...result3.map(e => e.length))
};

console.log(getShortest(codes.at(-1)));

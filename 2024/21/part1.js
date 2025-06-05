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

const computePath = (start, end) => {
  let explored = new Set();
  let toExplore = new Map();
  let result = [];
  toExplore.set(start, "");
  while (toExplore.size) {
    let newToExplore = new Set();
    for (let [path, pos] of toExplore) {
      console.log(Object.entries(keypad));
      let [x, y] = Object.entries(keypad).find(e => e[0] === pos)[1];
      console.log(x, y);
      return;
    }
    toExplore = newToExplore;
    if (result.length) {
      return result;
    }
  }

};
// console.log(computeScore(codes));
// console.log(typeFirstCode(codes.at(-1)));
// console.log(typeSecondCode(typeFirstCode(codes.at(-1))));
// console.log(typeSecondCode(typeSecondCode(typeFirstCode(codes.at(-1)))));
computePath("A", "1");

const input = require("fs").readFileSync("input").toString().slice(1, -2);

const parseAlternatives = (input) => {
  const content = input.slice(1, -1);
  const alternatives = [];
  let i = 0;
  let j = i;
  while (i < content.length) {
    const alt = [];
    if (j === content.length) {
      alternatives.push(content.slice(i, j));
      break;
    }
    if (content[j] === "|") {
      alternatives.push(content.slice(i, j));
      j++;
      i = j;
      continue;
    }
    if (content[j] === "(") {
      const len = findGroupLength(content.slice(j));
      j += len;
      continue;
    }
    j++;
  }
  return alternatives;
};

const findGroupLength = (input) => {
  let parenCount = 1;
  let pos = 1;
  while (parenCount && pos < input.length) {
    if (input[pos] === ")") {
      parenCount--;
    } else if (input[pos] === "(") {
      parenCount++;
    }
    pos++;
  }
  return pos;
};

const parseGroup = (input) => {
  return {
    alts: parseAlternatives(input).map((alt) => {
      if (alt.includes("(")) {
        return translateRegex(alt);
      }
      return alt;
    }),
  };
};

const translateRegex = (input) => {
  const res = [];
  let content = input;
  while (content.length) {
    if (content[0] === "(") {
      const len = findGroupLength(content);
      res.push(parseGroup(content));
      content = content.slice(len + 1);
    } else {
      const parenIndex = content.indexOf("(");
      res.push(content.slice(0, parenIndex));
      content = content.slice(parenIndex);
    }
  }
  return res;
};

const getAllPaths = (data) => {
  let res = [""];
  for (let item of data) {
    let newRes = [];
    if (typeof item === "string") {
      for (let r of res) {
        newRes.push(r + item);
      }
    } else {
      const alts = item.alts;
      for (let alt of item.alts) {
        const paths = getAllPaths(alt);
        for (let path of paths) {
          for (let r of res) {
            newRes.push(r + path);
          }
        }
      }
    }
    res = newRes;
  }
  return res;
};


const groups = {};

const parseAlternatives2 = (input) => {
  const content = input.slice(1, -1);
  const alternatives = [];
  let i = 0;
  let j = i;
  while (i < content.length) {
    const alt = [];
    if (j === content.length) {
      alternatives.push(i);
      break;
    }
    if (content[j] === "|") {
      alternatives.push(i);
      j++;
      i = j;
      continue;
    }
    if (content[j] === "(") {
      const len = findGroupLength(content.slice(j));
      j += len;
      continue;
    }
    j++;
  }
  return alternatives;
};

const getGroups = (input, index = 0) => {
  while (input[index] !== "(") {
    console.log(index);
    index++;
    if (index > input.length) {
      return;
    }
  }
  const sliced = input.slice(index);
  const len = findGroupLength(sliced);
  const alternatives = parseAlternatives2(sliced);
  groups[index] = {
    len, alternatives: alternatives.filter(el => el !== len),
  };
  getGroups(input, index + 1);
};
getGroups(input);
console.log(groups);
return;

let maxX = -Infinity;
let maxY = -Infinity;
let minX = Infinity;
let minY = Infinity;
const key = (x, y) => x + "," + y;
const stuff = {"0,0": "X"};

// walk directly the regex
for (let path of paths) {
  let x = 0;
  let y = 0;
  for (let segment of path) {
    if (segment === "W") {
      addToMap(x - 1, y, "|");
      addToMap(x - 2, y, ".");
      x -= 2;
      if (x < minX) {
        minX = x;
      }
    }
    if (segment === "S") {
      addToMap(x, y + 1, "-");
      addToMap(x, y + 2, ".");
      y += 2;
      if (y > maxY) {
        maxY = y;
      }
    }
    if (segment === "N") {
      addToMap(x, y - 1, "-");
      addToMap(x, y - 2, ".");
      y -= 2;
      if (y < minY) {
        minY = y;
      }
    }
    if (segment === "E") {
      addToMap(x + 1, y, "|");
      addToMap(x + 2, y, ".");
      x += 2;
      if (x > maxX) {
        maxX = x;
      }
    }
  }
}

// for (let y = minY -1; y < maxY + 2; y++) {
//   let line = y.toString().padEnd(10, " ");
//   for (let x = minX - 1; x < maxX + 2; x++) {
//     line = line  + (stuff[key(x, y)] || "#")
//   }
//   console.log(line);
// }

let toExplore = new Set();
toExplore.add("0,0");
let explored = new Set();

let doorCount = -1;
while (toExplore.size) {
  doorCount++;
  let newToExplore = new Set();
  for (let item of toExplore) {
    explored.add(item);
    const [x, y] = item.split(",").map(Number);
    if (stuff[key(x + 1, y)] === "|" && !explored.has(key(x + 2, y))) {
      newToExplore.add(key(x + 2, y));
    }
    if (stuff[key(x - 1, y)] === "|" && !explored.has(key(x - 2, y))) {
      newToExplore.add(key(x - 2, y));
    }
    if (stuff[key(x, y + 1)] === "-" && !explored.has(key(x, y + 2))) {
      newToExplore.add(key(x, y + 2));
    }
    if (stuff[key(x, y - 1)] === "-" && !explored.has(key(x, y - 2))) {
      newToExplore.add(key(x, y - 2));
    }
  }
  toExplore = newToExplore;
}
console.log(doorCount);



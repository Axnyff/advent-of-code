const fs = require("fs");
const data = fs
  .readFileSync("test-input")
  .toString()
  .split("\n")
  .filter((el) => el !== "");

const getDir = (s, [x, y] = [0, 0]) => {
  if (s === "") {
    return [x, y];
  }
  if (s.startsWith("e")) {
    return getDir(s.slice(1), [x, y + 1]);
  }
  if (s.startsWith("w")) {
    return getDir(s.slice(1), [x, y - 1]);
  }
  if (s.startsWith("sw")) {
    return getDir(s.slice(2), [x - 0.5, y - 0.5]);
  }
  if (s.startsWith("se")) {
    return getDir(s.slice(2), [x - 0.5, y + 0.5]);
  }
  if (s.startsWith("ne")) {
    return getDir(s.slice(2), [x + 0.5, y + 0.5]);
  }
  if (s.startsWith("nw")) {
    return getDir(s.slice(2), [x + 0.5, y - 0.5]);
  }
};

const items = data.map((el) => getDir(el));
let remaining = items.filter(
  ([x, y]) => items.filter((a) => a[0] == x && a[1] === y).length % 2 !== 0
);

const getNeighbours = ([x, y]) => {
  return [[x, y + 1], [x, y -1], 
    [x - 0.5, y - 0.5], [x - 0.5, y + 0.5],
    [x + 0.5, y - 0.5], [x + 0.5, y + 0.5]
  ];
};

const nextStep = (data) => {
  const stringifiedData = data.map(el => el.join(','));
  const allCandidates = data.flatMap(el => [el, ...getNeighbours(el)]).map(el => el.join(','));
  const candidates = [...new Set(allCandidates)].map(el => {
    const splitted = el.split(',');
    return [parseFloat(splitted[0]), parseFloat(splitted[1])];
  });
  console.log(candidates.length);
  console.log(candidates);

  return candidates.filter(el => {
    const neighbourCount = getNeighbours(el).map(el => el.join(',')).filter(nei => stringifiedData.includes(nei)).length;
    if (stringifiedData.includes(el.join(','))) {
      return neighbourCount === 1 || neighbourCount === 2;
    }
    return neighbourCount === 2;
  });

};

for (let i = 0; i < 1; i++) {
  remaining = nextStep(remaining);
}

console.log(JSON.stringify(remaining));


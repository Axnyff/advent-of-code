const plot = {};

const key = (x, y) => x + "," + y;

require("fs").readFileSync("input").toString().slice(0, -1).split("\n").forEach((line, y) => {
  line.split("").forEach((char, x) => {
    plot[key(x, y)] = char;
  });
});

const getElves = () => {
  const elves = Object.entries(plot).filter(([key, value]) => value === "#").map(([key]) => key);
  return elves;
};


const parse = (key) => {
  const [a, b] = key.split(",");
  return [Number(a), Number(b)];
};

const getBounds = () => {
  const coords = getElves().map(parse);
  const xs = coords.map(el => el[0]);
  const ys = coords.map(el => el[1]);

  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);

  return [yMin, yMax, xMin, xMax];
};

const show = () => {
  const [yMin, yMax, xMin, xMax] = getBounds();
  for (let y = yMin; y <= yMax; y++) {
    let line = y.toString().padEnd(5, " ");
    for (let x = xMin; x <= xMax; x++) {
      line += (plot[key(x, y)] || ".");
    }
    console.log(line);
  }
};

const newPos = (x, y, dir) => {
  switch (dir) {
    case "N":
      return key(x, y - 1);
    case "S":
      return key(x, y + 1);
    case "W":
      return key(x - 1, y);
    case "E":
      return key(x + 1, y);
  }
};

const order = ["N", "S", "W", "E"];
const round = () => {
  const elves = Object.entries(plot).filter(([key, value]) => value === "#").map(([key]) => key);

  const choices = elves.map(k => {
    const [x, y] = parse(k);

    const voisins = {
      "N": [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1]].map(pos => plot[key(...pos)] === "#"),
      "S": [[x - 1, y + 1], [x, y + 1], [x + 1, y + 1]].map(pos => plot[key(...pos)] === "#"),
      "W": [[x - 1, y - 1], [x - 1, y], [x - 1, y + 1]].map(pos => plot[key(...pos)] === "#"),
      "E": [[x + 1, y - 1], [x + 1, y], [x + 1, y + 1]].map(pos => plot[key(...pos)] === "#"),
    };

    const canMove = Object.values(voisins).flat().includes(true);
    if (!canMove) {
      return [k, undefined];
    } else {
      for (let dir of order) {
        if (!voisins[dir].includes(true)) {
          return [k, newPos(x, y, dir)];
        }
      }
      return [k, undefined];
    }
  });
  choices.forEach(([start, end]) => {
    if (!end) {
      return;
    }
    if (choices.some(c => c[0] !== start && c[1] === end)) {
      return;
    }
    plot[start] = ".";
    plot[end] = "#";
  });

  order.push(order.shift());
};
for (let i = 0; i < 10; i++ ) {
  round();
}
// show();

const [yMin, yMax, xMin, xMax] = getBounds();
let total = 0;
for (let y = yMin; y <= yMax; y++) {
  for (let x = xMin; x <= xMax; x++) {
    total += plot[key(x, y)] === "#" ? 0 : 1;
  }
}
console.log(total);

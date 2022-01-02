const lines = require("fs")
  .readFileSync("input")
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.split(""));

const getReadingOrder = ([x,y]) =>
  x * 100 + y;

const getKey = (i, j) => `${i},${j}`;

class Entity {
  constructor(position, type) {
    this.position = position;
    this.type = type;
    this.hp = 200;
    this.attack = 3;
  }

  get alive() {
    return this.hp > 0;
  }
  get initiative() {
    return getReadingOrder(this.position);
  }
}

let entities = [];
lines.forEach((line, i) => {
  line.forEach((cell, j) => {
    if (cell === "G") {
      entities.push(new Entity([i, j], "gobelin"));
      line[j] = ".";
    }
    if (cell === "E") {
      entities.push(new Entity([i, j], "elf"));
      line[j] = ".";
    }
  });
});

const offsets = [[0, -1], [-1, 0], [1, 0], [0, 1]];
const getBestPath = ([xstart, ystart], [xend, yend]) => {
  const explored = new Set();

  let toExplore = [JSON.stringify([[xstart, ystart]])];
  const res = [];
  let count = 0;
  explored.add(getKey(xstart, ystart));
  while (toExplore.length && !res.length) {
    count++;
    const newToExplore = new Set();
    for (let rawItem of toExplore) {
      const item = JSON.parse(rawItem);
      const [x, y] = item[item.length - 1];
      explored.add(getKey(x, y));
      for (let [dx, dy] of offsets) {
        const newX = x + dx;
        const newY = y + dy;
        if (lines[newX]?.[newY] === "#" || lines[newX]?.[newY] === undefined) {
          continue;
        }
        if (explored.has(getKey(newX, newY))) {
          continue;
        }
        if (newX === xend && newY === yend) {
          res.push([...item, count]);
        } else if (entities.every(e => !e.alive || e.position[0] !== newX || e.position[1] !== newY)) {
          if (item.length === 1) {
            newToExplore.add(JSON.stringify([[newX, newY], [newX, newY]]));
          } else {
            newToExplore.add(JSON.stringify([item[0], [newX, newY]]));
          }
        }
      }
    }
    toExplore = [...newToExplore];
  }
  if (res.length === 0) {
    return [[], Infinity];
  }
  return res.sort((a, b) => {
    return getReadingOrder(a[0]) - getReadingOrder(b[0]);
  })[0];
};

const drawMap = () => {
  lines.forEach((line, i,) => {
    let s = "";
    let printEntities = [];
    line.forEach((cell, j) => {
      const entity = entities.find(e => e.alive && e.position[0] === i && e.position[1] === j);
      if (entity) {
        s += entity.type === "gobelin" ? "G": "E";
        printEntities.push(entity);
      } else {
        s += cell;
      }
    });
    if (printEntities) {
      s+= " " + printEntities.map(e => (e.type === "gobelin" ? "G": "E") + "(" + e.hp + ")").join(" ");
    }
    console.log(s);
  });

};

let roundCompleted = 0;

const manhattan = ([x, y], [x2, y2]) => {
  return Math.abs(x - x2) + Math.abs(y - y2);
};

outer: while (true) {
  entities = entities.filter(e => e.alive);
  entities.sort((a, b) => a.initiative - b.initiative);
  for (let entity of entities) {
    if (!entity.alive) {
      continue;
    }
    const targetEntities = entities.filter((e => e.alive && e.type !== entity.type))
      .sort((a, b) => manhattan(a.position, entity.position) - manhattan(b.position, entity.position))
    ;
    if (targetEntities.length === 0) {
      break outer;
    }
    let possiblePaths = [];
    let currentMin = Infinity;
    for (let otherEntity of targetEntities) {
      const result = getBestPath(entity.position, otherEntity.position) || [[], Infinity];
      const min = result[result.length - 1];
      if (min === 1) {
        currentMin = 1;
      }
      if (min === currentMin && result[0].length !== 0) {
        currentMin = min;
        possiblePaths.push([result[0], result[1]]);
      }
      if (min < currentMin) {
        currentMin = min;
        possiblePaths = [[result[0], result[1]]];
      }
    }

    if (currentMin > 1 && currentMin !== Infinity) {
      possiblePaths.sort((a, b) => {
        return getReadingOrder(a[1]) - getReadingOrder(b[1]);
      });
      entity.position = possiblePaths[0][0];
    }

    const toAttack = targetEntities.filter(e => manhattan(e.position, entity.position) === 1);

    toAttack.sort((a, b) => (a.hp * 10000 + getReadingOrder(a.position)) - (b.hp * 10000 + getReadingOrder(b.position)));

    if (toAttack.length !== 0) {
      toAttack[0].hp -= entity.attack;
      if (!toAttack[0].alive) {
        console.log("has died");
      }
    }

  }
  roundCompleted++;
  console.log("After " + roundCompleted + " rounds");
}

const remainingHp = entities.filter(e => e.alive).map(el => el.hp).reduce((a, b) => a + b);
console.log(remainingHp * roundCompleted);


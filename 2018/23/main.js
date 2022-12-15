const bots = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((line) => {
    const match = line.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/);
    return {
      x: Number(match[1]),
      y: Number(match[2]),
      z: Number(match[3]),
      r: Number(match[4]),
    };
  });

const maxRadius = bots.reduce((max, bot) => Math.max(bot.r, max), 0);
const strongest = bots.find(({ r }) => r === maxRadius);

const distance = (botA, botB) => {
  return (
    Math.abs(botA.x - botB.x) +
    Math.abs(botA.y - botB.y) +
    Math.abs(botA.z - botB.z)
  );
};

console.log(bots.filter(({ x, y, z }) => Math.abs(x - strongest.x) + Math.abs(y - strongest.y) + Math.abs(z - strongest.z) <= maxRadius).length);

const graph = {};
for (let bot of bots) {
  graph[bot.r] = new Set();
}

for (let botA of bots) {
  for (let botB of bots) {
    if (botB !== botA && distance(botB, botA) < botB.r) {
      graph[botB.r.toString()].add(botA.r.toString());
    }
  }
}

const res = new Set();
let items = [];
for (let bot of Object.keys(graph)) {
  let toExplore = new Set([bot]);
  let resolved = new Set();
  while (toExplore.size) {
    let newToExplore = new Set();
    for (let item of toExplore) {
      if (!item || res.has(item)) {
        continue;
      }
      res.add(item);
      resolved.add(item);
      newToExplore = new Set([...newToExplore, ...graph[item]])
    }
    resolved.add(...toExplore);
    toExplore = newToExplore;
  }
  items = [...resolved];
  break;
}


const validBots = bots.filter(bot => items.includes(bot.r.toString()));

const minX = Math.min(...validBots.map(b => b.x));
const maxX = Math.max(...validBots.map(b => b.x));

validBots.sort((botA, botB) => distance(botB, {x: 0, y:0, z: 0}) - distance(botA, { x: 0, y: 0, z: 0}))
console.log(distance(validBots[0], { x: 0, y: 0, z: 0}) - validBots[0].r);

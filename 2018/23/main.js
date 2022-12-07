const bots = require('fs').readFileSync('input').toString().slice(0, -1).split("\n").map(line => {
  const match = line.match(/pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/);
  return {
    x: Number(match[1]),
    y: Number(match[2]),
    z: Number(match[3]),
    r: Number(match[4]),
  }
});

const maxRadius = bots.reduce((max, bot) => Math.max(bot.r, max), 0);
const strongest = bots.find(({ r }) => r === maxRadius);

console.log(bots.filter(({ x, y, z }) => Math.abs(x - strongest.x) + Math.abs(y - strongest.y) + Math.abs(z - strongest.z) <= maxRadius).length);

const meanX = bots.reduce((sum, bot) => sum + bot.x, 0) / bots.length;
console.log(meanX);

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

// console.log(bots.filter(({ x, y, z }) => Math.abs(x - strongest.x) + Math.abs(y - strongest.y) + Math.abs(z - strongest.z) <= maxRadius).length);

const getMinMax = (bots, fn) => {
  return [
    bots.reduce((sum, bot) => Math.min(sum, fn(bot)), Infinity),
    bots.reduce((sum, bot) => Math.max(sum, fn(bot)), -Infinity),
  ];
};

const [minX, maxX] = getMinMax(bots, (bot) => bot.x);
const [minY, maxY] = getMinMax(bots, (bot) => bot.y);
const [minZ, maxZ] = getMinMax(bots, (bot) => bot.z);

const size = Math.max(maxX - minX, maxY - minY, maxZ - minZ);

const closest = (bot, cube) => {
  let { x, y, z } = bot;

  if (x < cube.minX) {
    x = minX;
  }
  if (x > cube.maxX) {
    x = maxX;
  }
  if (y < cube.minY) {
    y = minY;
  }
  if (y > cube.maxY) {
    y = maxY;
  }
  if (z < cube.minZ) {
    z = minZ;
  }
  if (z > cube.maxZ) {
    z = maxZ;
  }
  return { x, y, z };
};

let startCube = {
  minX,
  maxX: minX + size,
  minY,
  maxY: minY + size,
  minZ,
  maxZ: minZ + size,
};

const distance = (botA, botB) => {
  return (
    Math.abs(botA.x - botB.x) +
    Math.abs(botA.y - botB.y) +
    Math.abs(botA.z - botB.z)
  );
};

const isInCube = (bot, cube) => {
  return distance(closest(bot, cube), bot) <= bot.r;
};

const vol = (cube) =>
  (cube.maxX - cube.minX) * (cube.maxY - cube.minY) * (cube.maxZ - cube.minZ);

const countBotsInCube = (cube) => {
  return bots.filter((bot) => isInCube(bot, cube)).length;
};

const findNextCube = (cube) => {
  const cubes = [
    {
      ...cube,
      maxX: Math.round((cube.minX + cube.maxX) / 2),
      maxY: Math.round((cube.minY + cube.maxY) / 2),
      maxZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      maxX: Math.round((cube.minX + cube.maxX) / 2),
      minY: Math.round((cube.minY + cube.maxY) / 2),
      maxZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      maxX: Math.round((cube.minX + cube.maxX) / 2),
      minY: Math.round((cube.minY + cube.maxY) / 2),
      minZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      maxX: Math.round((cube.minX + cube.maxX) / 2),
      maxY: Math.round((cube.minY + cube.maxY) / 2),
      minZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      minX: Math.round((cube.minX + cube.maxX) / 2),
      maxY: Math.round((cube.minY + cube.maxY) / 2),
      maxZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      minX: Math.round((cube.minX + cube.maxX) / 2),
      minY: Math.round((cube.minY + cube.maxY) / 2),
      maxZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      minX: Math.round((cube.minX + cube.maxX) / 2),
      minY: Math.round((cube.minY + cube.maxY) / 2),
      minZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
    {
      ...cube,
      minX: Math.round((cube.minX + cube.maxX) / 2),
      maxY: Math.round((cube.minY + cube.maxY) / 2),
      minZ: Math.round((cube.minZ + cube.maxZ) / 2),
    },
  ];

  console.log("ROUND");
  cubes.sort((cubeA, cubeB) => countBotsInCube(cubeB) - countBotsInCube(cubeA));

  cubes.forEach(cube => console.log(countBotsInCube(cube)));
  return cubes[0];
};

let cube = startCube;
for (let i = 0; i < 10; i++) {
  cube = findNextCube(cube);
  console.log(countBotsInCube(cube));
}

console.log(startCube, cube);

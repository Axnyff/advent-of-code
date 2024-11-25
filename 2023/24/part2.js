const lines = require("fs").readFileSync("test-input").toString().trim().split("\n");

const hailstones = lines.map(l => {
  const [pos, speed] = l.split(" @ ");
  return {
    pos: pos.split(",").map(Number),
    speed: speed.split(",").map(Number),
  };
});


const colinear = (hail1, hail2) => {
  const ratio = hail1.speed[0] / hail2.speed[0];
  return hail1.speed[1]  / hail2.speed[1] === ratio;
};

const min = 200000000000000;
const max = 400000000000000;

const isBetween = (a, start, end) => {
  return a >= start && a <= end;
};

const isFutureIntersection = (hail1, hail2, log) => {
  const a = hail1.speed[1] / hail1.speed[0];
  const b = hail2.speed[1] / hail2.speed[0];

  const c = hail1.pos[1] - hail1.pos[0] * hail1.speed[1] / hail1.speed[0];
  const d = hail2.pos[1] - hail2.pos[0] * hail2.speed[1] / hail2.speed[0];

  const x = (d - c) / (a - b);
  const y = a * x + c;


  const t1 = (x - hail1.pos[0]) / hail1.speed[0];
  const t2 = (x - hail2.pos[0]) / hail2.speed[0];

  return t1 >= 0 && t2 >= 0 && isBetween(x, min, max) && isBetween(y, min, max);
};

console.log(hailstones[2]);
x0 + vx * t0 = 19 + -2t0
y0 + vy * t0 = 13 + to;
z0 + vy * t0 = 30 - 2to

x0 + vx * t1 = 18 -t1
y0 + vy * t1 = 19 - t1
z0 + vy * t1 = 22 - t1


x0 + vx * t2 = 20 -2t2
y0 + vy * t2 = 25 -2t2
z0 + vy * t2 = 34 - 4t2

const input = require("fs").readFileSync("input").toString().slice(0, -1);
console.clear();

// NOTE: on normal input my answer of 1501 is too low
// NOTE: after fixing airCount my answer of 3242 is too high
const lines = input.split("\n").map((x) => x.replace("\r", ""));
const lava = lines.reduce((p, c) => Object.assign(p, { [c]: true }), {});

const addAir = (air, x, y, z) => {
  let key = `${x},${y},${z}`;
  if (lava[key]) return;
  air[key] = true;
};

const air = lines.reduce((p, line) => {
  let [x, y, z] = line.split(",").map((x) => parseInt(x));
  addAir(p, x, y, z - 1);
  addAir(p, x, y, z + 1);
  addAir(p, x, y - 1, z);
  addAir(p, x, y + 1, z);
  addAir(p, x - 1, y, z);
  addAir(p, x + 1, y, z);
  return p;
}, {});
console.log(air);

// If we have a trapped cavity larger than 2x2, that would leave some
// air in the middle that isn't really exposed.  To counter that,
// let's loop a few times to expand those internal airs:
for (let i = 0; i < 5; i++) {
  Object.keys(air).forEach((airCube) => {
    let [x, y, z] = airCube.split(",").map((x) => parseInt(x));
    addAir(air, x, y, z - 1);
    addAir(air, x, y, z + 1);
    addAir(air, x, y - 1, z);
    addAir(air, x, y + 1, z);
    addAir(air, x - 1, y, z);
    addAir(air, x + 1, y, z);
  });
}
const checkLava = (x, y, z) => lava[`${x},${y},${z}`];
const checkAir = (x, y, z) => air[`${x},${y},${z}`];
const countAdjacent = (x, y, z, fn) => {
  return (
    (fn(x, y, z - 1) ? 1 : 0) +
    (fn(x, y, z + 1) ? 1 : 0) +
    (fn(x, y - 1, z) ? 1 : 0) +
    (fn(x, y + 1, z) ? 1 : 0) +
    (fn(x - 1, y, z) ? 1 : 0) +
    (fn(x + 1, y, z) ? 1 : 0)
  );
};

// remove airs that have at least one open side until we can't anymore,
// counting the lava surfaces attached to them when we remove
let exposedLavaSurfaces = 0;
while (true) {
  let removedCount = 0;
  Object.keys(air).forEach((airCube) => {
    let [x, y, z] = airCube.split(",").map((x) => parseInt(x));
    let lavaCount = countAdjacent(x, y, z, checkLava);
    let airCount = countAdjacent(x, y, z, checkAir);
    if (lavaCount + airCount < 6) {
      console.log(
        `Removing air at ${airCube} adding ${lavaCount} exposed lava surfaces`
      );
      exposedLavaSurfaces += lavaCount;
      removedCount++;
      delete air[airCube];
    }
  });
  if (removedCount === 0) break;
}

console.log(exposedLavaSurfaces);

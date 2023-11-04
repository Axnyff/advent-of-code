const xT = 5;
const yT = 746;
const depth = 4002;


const geos = {};
const key = (x, y) => x + ',' + y;
const getGeo = (x, y) => {
  if (x === 0 && y === 0) {
    return 0;
  }
  if (x === xT && y === yT) {
    return 0;
  }
  if (y === 0) {
    return x * 16807;
  }
  if (x === 0) {
    return y * 48271;
  }
  const k = key(x, y);
  if (geos[k]) {
    return geos[k];
  }
  const res = getErosion(x - 1, y) * getErosion(x, y -1);
  geos[k] = res;
  return res;
};

const erosions = {};
const getErosion = (x, y) => {
  const k = key(x, y);
  if (erosions[k]) {
    return erosions[k];
  }
  const res = (getGeo(x, y) + depth) % 20183;
  erosions[k] = res;
  return res;
};

const getType = (x, y) => getErosion(x, y) % 3;

let totalRisk = 0;
for (let x = 0; x <= xT; x++) {
  for (let y = 0; y <= yT; y++) {
    totalRisk += getType(x, y);
  }
}

console.log(totalRisk);

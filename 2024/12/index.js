const map = {};

const key = (x, y) => x + "," + y;
const unkey = (k) => k.split(",").map(Number);
let xMax = 0;
let yMax = 0;

require("fs")
  .readFileSync("input")
  .toString()
  .trim()
  .split("\n")
  .forEach((l, y) => {
    yMax = Math.max(y, yMax);
    l.split("").forEach((c, x) => {
      map[key(x, y)] = c;
      xMax = Math.max(x, xMax);
    });
  });

const regions = [];
const used = new Set();

for (let x = 0; x <= xMax; x++) {
  for (let y = 0; y <= yMax; y++) {
    const k = key(x, y);
    if (used.has(k)) {
      continue;
    }
    used.add(k);
    let toExplore = new Set([k]);
    const c = map[k];
    const region = [k];
    while (toExplore.size) {
      let newToExplore = new Set();
      for (let item of toExplore) {
        const [x, y] = unkey(item);
        for (let newItem of [
          [x, y + 1],
          [x, y - 1],
          [x + 1, y],
          [x - 1, y],
        ]) {
          const k2 = key(...newItem);
          if (used.has(k2)) {
            continue;
          }
          if (map[k2] === c) {
            newToExplore.add(k2);
            used.add(k2);
            region.push(k2);
          }
        }
      }
      toExplore = newToExplore;
    }
    regions.push(region);
  }
}

const scoreRegion = (region) => {
  const area = region.length;

  let perimeter = 0;
  for (let k of region) {
    const [x, y] = unkey(k);
    const c = map[k];
    for (let newItem of [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ]) {
      const k2 = key(...newItem);
      if (map[k2] !== map[k]) {
        perimeter++;
      }
    }
  }
  return area * perimeter;
};

const scoreRegion2 = (region) => {
  const area = region.length;

  let perimeter = [];
  const c = map[region[0]];
  const log = false;
  for (let k of region) {
    const [x, y] = unkey(k);
    for (let newItem of [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ]) {
      const k2 = key(...newItem);
      if (map[k2] !== map[k]) {
        perimeter.push([k, k2]);
      }
    }
  }

  let result = 0;

  const above = perimeter.filter(([k, k2]) => {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);

    return x === x2 && y2 === y - 1;
  });

  const below = perimeter.filter(([k, k2]) => {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);

    return x === x2 && y2 === y + 1;
  });

  const right = perimeter.filter(([k, k2]) => {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);

    return y === y2 && x2 === x + 1;
  });

  const left = perimeter.filter(([k, k2]) => {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);

    return y === y2 && x2 === x - 1;
  });

  for (let [k, k2] of above) {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);
    if (
      !above.some(([, k3]) => {
        const [x3, y3] = unkey(k3);
        let result = y3 === y2 && x3 === x2 + 1;
        return result;
      })
    ) {
      if (log) {
        console.log("ABOVE");
      }
      result++;
    }
  }

  for (let [k, k2] of below) {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);
    if (
      !below.some(([, k3]) => {
        const [x3, y3] = unkey(k3);
        let result = y3 === y2 && x3 === x2 + 1;
        return result;
      })
    ) {
      if (log) {
        console.log("BELOW");
      }
      result++;
    }
  }

  for (let [k, k2] of right) {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);
    if (
      !right.some(([, k3]) => {
        const [x3, y3] = unkey(k3);
        let result = x3 === x2 && y3 === y2 + 1;
        return result;
      })
    ) {
      if (log) {
        console.log("RIGHT");
      }
      result++;
    }
  }

  for (let [k, k2] of left) {
    const [x, y] = unkey(k);
    const [x2, y2] = unkey(k2);
    if (
      !left.some(([, k3]) => {
        const [x3, y3] = unkey(k3);
        let result = x3 === x2 && y3 === y2 + 1;
        return result;
      })
    ) {
      if (log) {
        console.log("LEFT");
      }
      result++;
    }
  }

  return area * result;
};

// console.log(regions.map(scoreRegion).reduce((a, b) => a + b));
console.log(
  regions
    .map(scoreRegion2)
    .reduce((a, b) => a + b),
);

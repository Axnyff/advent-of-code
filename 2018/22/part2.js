const xT = 10;
const yT = 10;
const depth = 510;
// const xT = 5;
// const yT = 746;
// const depth = 4002;


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


let toExplore = new Map();
toExplore.set("0,0,T", "");

let explored = new Map();


const show = () => {
  for (let y = 0; y <= 20; y++) {
    let line = y.toString().padEnd(3, " ");
    for (let x = 0; x <= 20; x++) {
      const type = getType(x, y);
      if (x === xT && y === yT) {
        line += "T";
        continue;
      }
      if (type === 0) {
        line += "."
      }
      if (type === 1) {
        line += "="
      }
      if (type === 2) {
        line += "|"
      }
    }
    console.log(line);
  }
};

const getCost = (path) => {
  let total = 0;
  for (let item of path) {
    if ("CNT".includes(item)) {
      total += 7;
    } else {
      total += 1;
    }
  }
  return total;
};
let foundCost = Infinity;
while (toExplore.size) {
  if (toExplore.has("D")) {
    console.log("GOT IT");
  }
  let newToExplore = new Map();
  for (let [item, path] of toExplore) {
    explored.set(item, path);
    const explore = (key, path) => {
      const exploredCost = explored.has(key) ? getCost(explored.get(key)) : Infinity;
      const toExploreCost = newToExplore.has(key) ? getCost(newToExplore.get(key)) : Infinity;
      const cost = getCost(path);
      if (cost < exploredCost && cost < toExploreCost) {
        newToExplore.set(key, path);
      }
    };
    const addPath = (x, y, currentType, tool, prev, dir) => {
      console.assert((currentType !== 0 || tool !== "N") || (currentType !== 1 || tool !== "T") || (currentType === 2 && tool !== "T"), currentType + tool);
      if (x < 0 || y < 0) {
        return;
      }
      const type = getType(x, y);
      const k = key(x, y);

      if (type === 0) {
        if (tool !== "N") {
          explore(k + "," + tool, prev + dir);
        } else {
          const newTool = currentType === 1 ? "C" : "T";
          explore(k + "," + newTool, prev + newTool + dir);
        }
      } else if (type === 1) {
        if (tool !== "T") {
          explore(k + "," + tool, prev + dir);
        } else {
          const newTool = currentType === 0 ? "C" : "N";
          explore(k + "," + newTool, prev + newTool + dir);
        }
      } else if (type === 2) {
        if (tool !== "C") {
          explore(k + "," + tool, prev + dir);
        } else {
          const newTool = currentType === 0 ? "T" : "N";
          explore(k + "," + newTool, prev + newTool + dir);
        }
      }
    };
    const [raw_x, raw_y, tool] = item.split(",");
    const x = Number(raw_x);
    const y = Number(raw_y);
    const currentType = getType(x, y);
    if (x === xT && y === yT) {
      const cost = tool === "T" ? getCost(path) : getCost(path + "T");
      if (cost < foundCost) {
        foundCost = cost;
        console.log(path);
        console.log(cost);
      }
    }
    addPath(x + 1, y, currentType, tool, path, "R");
    addPath(x - 1, y, currentType, tool, path, "L");
    addPath(x, y + 1, currentType, tool, path, "D");
    addPath(x, y - 1, currentType, tool, path, "U");
  }
  toExplore = newToExplore;
}

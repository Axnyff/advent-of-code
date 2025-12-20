const boxes = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split(",").map(Number));

const connections = {};
const distances = [];

for (let i = 0; i < boxes.length - 1; i++) {
  const box = boxes[i];
  for (let j = i + 1; j < boxes.length; j++) {
    const box2 = boxes[j];
    const [x, y, z] = box;
    const [x2, y2, z2] = box2;
    distances.push([
      Math.sqrt(
        Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2) + Math.pow(z2 - z, 2),
      ),
      i,
      j,
    ]);
  }
}
distances.sort((a, b) => a[0] - b[0]);

let count = 0;
const circuits = boxes.map((_, j) => j);

let groups = Array.from({ length: boxes.length }, (_, i) => new Set([i]));
while (true) {
  const [, i, j] = distances.shift();
  const groupIndex = groups.findIndex((group) => group.has(i));
  const groupIndex2 = groups.findIndex((group) => group.has(j));
  // if (i === 2 && j === 18) {
  //   console.log(groupIndex, groupIndex2, groups);
  // }
  count++;
  if (groupIndex === -1 && groupIndex2 === -1) {
    groups.push(new Set([i, j]));
  } else if (groupIndex !== -1 && groupIndex2 !== -1) {
    if (groupIndex === groupIndex2) {
      continue;
    }
    const [lower, higher] = [groupIndex, groupIndex2].sort((a, b) => a - b);
    const group = groups[higher];
    groups = groups.filter((g) => g !== group);
    for (let item of group) {
      groups[lower].add(item);
    }
  } else {
    const groupI = groupIndex === -1 ? groupIndex2 : groupIndex;
    // console.log(groupI);
    const group = groups[groupI];
    if (group.has(i) && group.has(j)) {
      continue;
    }
    group.add(i);
    group.add(j);
    // if (i === 2 && j === 18) {
    //   console.log(groupIndex, groupIndex2);
    // }
  }
  if (groups.length === 1 && count > 1000) {
    console.log(boxes[i], boxes[j]);
    console.log(i, j, boxes[i][0] * boxes[j][0]);
    return;
  }
}

console.log(
  groups
    .map((g) => g.size)
    .sort((g, g2) => g2 - g)
    .slice(0, 3)
    .reduce((a, b) => a * b),
);

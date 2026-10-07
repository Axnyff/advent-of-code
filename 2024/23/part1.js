const fs = require("fs");

const data = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split("-"));

const connexions = {};
data.forEach((d) => {
  connexions[d[0]] = connexions[d[0]] || [];
  connexions[d[0]].push(d[1]);

  connexions[d[1]] = connexions[d[1]] || [];
  connexions[d[1]].push(d[0]);
});

const all = new Set();

for (let [start, mids] of Object.entries(connexions)) {
  for (let mid of mids) {
    for (let end of connexions[mid]) {
      if (end !== start && connexions[end].includes(start)) {
        all.add([start, mid, end].sort((a, b) => a.localeCompare(b)).join(","));
      }
    }
  }
}
console.log(
  [...all].filter((el) => {
    return el.startsWith("t") || el.includes(",t");
  }).length
);

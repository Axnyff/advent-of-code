const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");
const stars = [];
lines.forEach((l, y) => {
  l.split("").forEach((c, x) => {
    if (c === "#") {
      stars.push([x, y]);
    }
  });
});

const rows = new Set(stars.map(el => el[0]));
const cols = new Set(stars.map(el => el[1]));

let total = 0;
for (let i = 0; i < stars.length; i++) {
  for (let j = i + 1; j < stars.length; j++) {
    const [x, y] = stars[i];
    const [x2, y2] = stars[j];
    let subtotal = 0;
    for (let k = Math.min(x, x2); k < Math.max(x, x2); k++) {
      if (rows.has(k)) {
        subtotal += 1;
      } else {
        subtotal += 2;
      }
    }
    for (let k = Math.min(y, y2); k < Math.max(y, y2); k++) {
      if (cols.has(k)) {
        subtotal += 1;
      } else {
        subtotal += 2;
      }
    }
    total += subtotal;
  }
}
console.log(total);

let total2 = 0;
const ratio = 1_000_000;
for (let i = 0; i < stars.length; i++) {
  for (let j = i + 1; j < stars.length; j++) {
    const [x, y] = stars[i];
    const [x2, y2] = stars[j];
    let subtotal = 0;
    for (let k = Math.min(x, x2); k < Math.max(x, x2); k++) {
      if (rows.has(k)) {
        subtotal += 1;
      } else {
        subtotal += ratio;
      }
    }
    for (let k = Math.min(y, y2); k < Math.max(y, y2); k++) {
      if (cols.has(k)) {
        subtotal += 1;
      } else {
        subtotal += ratio;
      }
    }
    total2 += subtotal;
  }
}
console.log(total2);

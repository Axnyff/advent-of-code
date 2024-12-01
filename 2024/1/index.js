const lines = require("fs").readFileSync("input").toString().trim().split("\n");

const a = [];
const b = [];

lines.forEach(l => {
  const [c, d] = l.split(/\s+/);

  a.push(Number(c));
  b.push(Number(d));
});
a.sort((a, b) => a - b);
b.sort((a, b) => a - b);

let total = 0;
for (let i = 0; i < a.length; i++) {
  total += Math.abs(a[i] - b[i]);
}
console.log(total);

let total2 = 0;
for (let i = 0; i < a.length; i++) {
  if (b.includes(a[i])) {
    total2 += a[i] * (1 + b.lastIndexOf(a[i]) - b.indexOf(a[i]));
  }
}
console.log(total2);

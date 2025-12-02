const data = require("fs").readFileSync("input").toString().slice(0, -1);

let total = 0;
for (item of data.split(",")) {
  const [start, end] = item.split("-");

  for (let i = Number(start); i <= Number(end); i++) {
    if (i.toString().match(/^(\d+)\1+$/)) {
      total += i;
    }
  }
}
console.log(total);

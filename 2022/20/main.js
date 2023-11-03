const fs = require("fs");

const data = fs.readFileSync("input").toString().slice(0, -1).split("\n").map(Number);
console.log(data[10]);

for (let i = 0; i < data.length; i++) {
  let num = data[i];
  if (data.indexOf(num) !== data.lastIndexOf(num)) {
    console.log("OO", data.indexOf(num), data.lastIndexOf(num));

  }
}

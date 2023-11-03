const input = require("fs")
  .readFileSync("yolo")
  .toString()
  .slice(0, -1);


const matches = input.matchAll(/#(\||#)+#/g)
let total = 0;
for (let i of matches) {
  total += i[0].replace(/#/g, "").length;
}
console.log(total);

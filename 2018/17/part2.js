const input = require("fs")
  .readFileSync("yolo")
  .toString()
  .slice(0, -1);


const matches = input.matchAll(/#\|+#/g)
let total = 0;
for (let i of matches) {
  console.log(i.toString(), i[0].length);
  total += i[0].length - 2;
}
console.log(total);

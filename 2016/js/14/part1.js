const md5 = require("md5");
const key = "ihaygndm";

const data = {};

let count = 0;
let index = 39;
while (count < 64) {
  const s = key + index;
  const hash = md5(s);
  const match = hash.match(/(\w)\1{2}/);
  if (match) {
    const matched = match[1];

    for (let j = 1; j <= 1000; j++) {
      const hash = md5(key + (j + index));
      const regex = new RegExp(matched + "{5}");
      const match = hash.match(regex);
      if (match) {
        count++;
        break;
      }
    }
  }
  index++;
}
console.log(index - 1);

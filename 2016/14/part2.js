const md5 = require("md5");
const key = "ihaygndm";

const data = {};

let count = 0;
let index = 0;

const getHash = (input) => {
  let result = input;
  if (data[input]) {
    return data[input];
  }
  for (let i = 0; i < 2017; i++) {
    result = md5(result);
  }
  data[input] = result;
  return result;
};
while (count < 64) {
  const s = key + index;
  const hash = getHash(s);
  const match = hash.match(/(\w)\1{2}/);
  if (match) {
    const matched = match[1];

    for (let j = 1; j <= 1000; j++) {
      const hash = getHash(key + (j + index));
      const regex = new RegExp(matched + "{5}");
      const match = hash.match(regex);
      if (match) {
        console.log(index);
        count++;
      }
    }
  }
  index++;
}
console.log(index - 1);

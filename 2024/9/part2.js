const data = require("fs").readFileSync("test-input").toString().trim().split("").map(Number);

const result = [];
let start = 0;
let consumedEnds = [];

let freeIndex = 1;
outer: while (true) {
  const item = data[start];
  for (let i = 0; i < item; i++) {
    result.push(start / 2)
  }
  start += 2;
  while (consumedEnds.includes(start)) {
    start += 2;
    if (start > data.length) {
      break outer;
    }
  }
  console.log("First", result.join(""));

  let end = data.length - 1;

  let free = data[freeIndex];
  console.log(free, freeIndex);
  outer2: while (free > 0) {
    while (consumedEnds.includes(end) || data[end] > free) {
      end -= 2;
      if (end <= start) {
        for (let i = 0; i < free; i++) {
          result.push(0);
          break outer2;
        }
      }
    }
    const item2 = data[end];
    if (data[end] <= free) {
      consumedEnds.push(end);
      for (let i = 0; i < item2; i++) {
        result.push(end / 2)
      }
    }
    free -= data[end];
  }


  console.log("Second", result.join(""));
  freeIndex += 2;
}
console.log(result.join(""));
console.log("00992111777.44.333....5555.6666.....8888..");
let total = 0;
for (let i = 0; i < result.length; i++) {
  total += i * result[i]
}
console.log(total);

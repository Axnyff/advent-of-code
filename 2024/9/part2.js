const data = require("fs").readFileSync("input").toString().trim().split("").map(Number);

const result = [];
let start = 0;
let consumedEnds = [];

let freeIndex = 1;
let end = data.length - 1;
outer: while (start < data.length) {
  if (start % 1000 === 0) {
    console.log(start);
  }
  const item = data[start];
  for (let i = 0; i < item; i++) {
    if (consumedEnds.includes(start)) {
      result.push(0);
    } else {
      result.push(start / 2)
    }
  }
  start += 2;

  let currentEnd = end;

  let free = data[freeIndex];
  while (free > 0 ) {
    while (consumedEnds.includes(currentEnd) || data[currentEnd] > free) {
      end -= 2;
      if (end <= start) {
        for (let i = 0; i < free; i++) {
          result.push(0);
          break;
        }
        free = 0;
      }
    }
    const item2 = data[end];
    if (data[end] <= free) {
      consumedEnds.push(end);
      for (let i = 0; i < item2; i++) {
        result.push(end / 2)
      }
    }
    free -= item2;
  }


  freeIndex += 2;
}
let total = 0;
for (let i = 0; i < result.length; i++) {
  total += i * result[i]
}
console.log(total);

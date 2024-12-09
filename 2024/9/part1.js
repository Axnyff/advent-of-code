const data = require("fs").readFileSync("input").toString().trim().split("").map(Number);

const result = [];
let start = 0;
let end = data.length - 1;

let consumedEnd = 0;
while (start < end) {
  const item = data[start];
  for (let i = 0; i < item; i++) {
    result.push(start / 2)
  }
  start += 2;

  let free = data[start - 1] - 1;
  let endItem = data[end];
  for (let i = free; i >= 0; i--) {
    result.push((end / 2));
    consumedEnd++;
    if (consumedEnd >= endItem) {
      consumedEnd = 0;
      end -= 2;
      endItem = data[end];
    }
  }
}
for (let i = consumedEnd; i < data[end]; i++) {
  result.push(end / 2);
}

let total = 0;
for (let i = 0; i < result.length; i++) {
  total += i * result[i]
}
console.log(total);

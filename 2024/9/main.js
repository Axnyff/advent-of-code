const data = require("fs").readFileSync("test-input").toString().trim().split("").map(Number);
console.log(data);

const result = [];
let start = 0;
let end = data.length - 1;

while (start < end) {
  let consumedEnd = 0;
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
  console.log("\n");
}
console.log(result);
console.log(result.join(""));
console.log("0099811188827773336446555566");
p
for (let 

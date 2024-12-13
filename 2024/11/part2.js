let nums = require("fs").readFileSync("input").toString().trim().split(" ").map(Number);
console.log(nums);

let data = {};
nums.forEach(num => {
  data[num] = data[num] || 0;
  data[num] += 1;
});


for (let i = 0; i < 75; i++) {
  let newData = {};
  for (let [str, count] of Object.entries(data)) {
    if (str === "0") {
      newData[1] = newData[str] || 0;
      newData[1] += count;
    } else if (str.length % 2 === 0) {
      let size = str.length / 2;

      let str1 = Number(str.slice(0, size));
      let str2 = Number(str.slice(size));

      newData[str1] = newData[str1] || 0;
      newData[str1] += count;

      newData[str2] = newData[str2] || 0;
      newData[str2] += count;
    } else {
      const num = Number(str) * 2024;
      newData[num] = newData[num] || 0;
      newData[num] += count;
    }
  }
  data = newData;
}

let total = 0;
for (let [, count] of Object.entries(data)) {
  total += count;
}
console.log(total);

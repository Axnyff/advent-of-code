const fs = require("fs");

const data = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n")
  .map((el) => el.split("\n"));

const keys = [];
const locks = [];

for (let item of data) {
  const sliced = item.slice(1, -1);
  if (item[0][0] === ".") {
    keys.push(
      sliced.map(
        (_, i) => sliced.map((it) => it[i]).filter((el) => el === "#").length,
      ),
    );
  } else {
    locks.push(
      sliced.map(
        (_, i) => sliced.map((it) => it[i]).filter((el) => el === "#").length,
      ),
    );
  }
}

const fit = (key, lock) => {
  return key.every((el, i) => el + lock[i] <= 5);
};

let count = 0;
for (let key of keys) {
  for (let lock of locks) {
    if (fit(key, lock)) {
      count++;
    }
  }
}
console.log(count);

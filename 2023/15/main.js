const items = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split(",");

const algo = (input) => {
  let v = 0;
  for (let c of input) {
    const code = c.charCodeAt(0);
    v += code;
    v *= 17;
    v %= 256;
  }
  return v;
};

console.log(items.map(algo).reduce((a, b) => a + b));

let boxes = new Map();

const setIn = (hash, item) => {
  if (boxes.has(hash)) {
    let box = boxes.get(hash);
    if (box.some((boxItem) => boxItem[0] === item[0])) {
      boxes.set(
        hash,
        box.map((boxItem) => {
          return boxItem[0] === item[0] ? item : boxItem;
        })
      );
    } else {
      boxes.get(hash).push(item);
    }
  } else {
    boxes.set(hash, [item]);
  }
};
for (let item of items) {
  if (item.includes("=")) {
    let [label, num] = item.split("=");
    const hash = algo(label);
    setIn(hash, [label, Number(num)]);
  } else {
    let label = item.slice(0, -1);
    const hash = algo(label);
    boxes.set(
      hash,
      (boxes.get(hash) || []).filter(([l]) => l !== label)
    );
  }
}

let total = 0;
for (let [key, box] of boxes) {
  for (let i = 0; i < box.length; i++) {
    total += (key + 1) * (i + 1) * box[i][1];
  }
}
console.log(total);

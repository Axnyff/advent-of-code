const fs = require("fs");

const key = 811589153;
let data = fs.readFileSync("input").toString().slice(0, -1).split("\n").map((el, index) => [Number(el) * key, index]);

const addItemAtIndex = (list, item, index) => {
  if (index >= list.length) {
    return [...list, item];
  }

  return [...list.slice(0, index), item, ...list.slice(index, list.length)];
};

const removeItemAtIndex = (list, index) => {
  if (index > list.length - 1) {
    return [...list.slice(index - 1)];
  }

  return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
};

const changeItemIndex = (list, previousIndex, newIndex) => {
  const item = list[previousIndex];
  return addItemAtIndex(removeItemAtIndex(list, previousIndex), item, newIndex);
};

for (let n = 0; n < 10; n++) {
  for (let i = 0; i < data.length; i++) {
    const index = data.findIndex(([_, index]) => index === i);
    let target = data[index][0];
    let newIndex = index + (target % (data.length - 1));
    if (newIndex >= data.length) {
      newIndex = newIndex - data.length + 1
    } else if (newIndex <= 0 ){
      newIndex += data.length - 1;
    }
    let [removed] = data.splice(index, 1);
    data.splice(newIndex, 0, removed);
  }
}

const index = data.findIndex(v => v[0] === 0);
console.log(
  data[(index + 1000) % data.length][0] +
  data[(index + 2000) % data.length][0] +
  data[(index + 3000) % data.length][0]
);


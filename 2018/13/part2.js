const data = require('fs').readFileSync('input').toString().trimEnd().split("\n").map(el => el.split(""));;

let carts = []
data.forEach((line, y) => {
  line.forEach((char, x) => {
    if (char === ">") {
      line[x] = "-";
      carts.push([x, y, 1, 0, 0]);
    }
    if (char === "<") {
      line[x] = "-";
      carts.push([x, y, -1, 0, 0]);
    }
    if (char === "^") {
      line[x] = "|";
      carts.push([x, y, 0, -1, 0]);
    }
    if (char === "v") {
      line[x] = "|";
      carts.push([x, y, 0, 1, 0]);
    }
  })
});

const rotateLeft = ([x, y]) =>
  [y, -x];

const rotateRight = (inp) => rotateLeft(rotateLeft(rotateLeft(inp)));

const tick = (carts) => {
  const positionsMap = {};
  carts.map(([x, y]) => `${x},${y}`).forEach(key => {
    positionsMap[key] = true;
  });
  const newCarts = carts.sort((cartA, cartB) => {
    return cartA[1] * 1000 + cartA[0] - cartB[1] * 1000 - cartB[0];
  }).map(([x, y, dx, dy, order]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (positionsMap[`${newX},${newY}`]) {
      console.log(`${newX},${newY}`);
      process.exit();
    }
    const cell = data[newY][newX];
    if (cell === "-"  || cell === "|") {
      return [newX, newY, dx, dy, order];
    }
    if (cell === "/") {
      if (dx === 0) {
        return [newX, newY, ...rotateRight([dx, dy]), order];
      }
      return [newX, newY, ...rotateLeft([dx, dy]), order];
    }
    if (cell ===  "\\") {
      if (dy === 0) {
        return [newX, newY, ...rotateRight([dx, dy]), order];
      }
      return [newX, newY, ...rotateLeft([dx, dy]), order];
    }
    if (cell === "+") {
      let rot = [dx, dy];
      if (order === 0) {
        rot = rotateLeft(rot);
      }
      if (order === 2) {
        rot = rotateRight(rot);
      }
      return [newX, newY, ...rot, (order + 1) % 3];
    }
  });
  return newCarts;
};
const showCursor = (dx, dy) => {
  return {
    "1,0": ">",
    "-1,0": "<",
    "0,1": "v",
    "0,-1": "^",
  }[`${dx},${dy}`]
};

const printMap = () => {
  for (let i = 0; i < data.length; i++) {
    let s = "";
    for (let j = 0; j < data[0].length; j++) {
      const cart = carts.find(([x, y]) => x === j && y === i);
      if (cart) {
        s += showCursor(cart[2], cart[3]);
      } else {
        s += data[i][j] || "";
      }
    }
    console.log(s);
  }
  console.log("\n\n");
};


while(true) {
  carts = tick(carts);
}



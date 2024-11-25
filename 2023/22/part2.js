const lines = require("fs").readFileSync("input").toString().trim().split("\n");

const bricks = lines.map(l => {
  const [start, end] = l.split("~");
  return {
    start: start.split(",").map(Number),
    end: end.split(",").map(Number)
  };
});

const isBetween = (a, start, end) => {
  return a >= start && a <= end;
};

const isOverlapping = (brickA, brickB) => {
  const xMatching = isBetween(brickA.start[0], brickB.start[0], brickB.end[0]) || isBetween(brickA.end[0], brickB.start[0], brickB.end[0]) || isBetween(brickB.start[0], brickA.start[0], brickA.end[0]);
  const yMatching = isBetween(brickA.start[1], brickB.start[1], brickB.end[1]) || isBetween(brickA.end[1], brickB.start[1], brickB.end[1]) || isBetween(brickB.start[1], brickA.start[1], brickA.end[1]);

  return xMatching && yMatching;
};

const isOnTheFloor = (brick, otherBricks) => {
  if (brick.start[2] === 1) {
    return true;
  }

  return otherBricks.some(other => {
    if (other.end[2] !== brick.start[2] - 1) {
      return false;
    }
    return isOverlapping(brick, other);
  });
};

let hasMoved = true;
let i = 0;
while (hasMoved) {
  hasMoved = false;
  for (let brick of bricks) {
    i++;
    if (!isOnTheFloor(brick, bricks.filter(b => b !== brick))) {
      brick.start[2]--;
      brick.end[2]--;
      hasMoved = true;
    }
  }
}

const movingBrickCount = (brick) => {
  let otherBricks = bricks.filter(b => b !== brick);
  let otherBricksTemp = bricks.filter(b => b !== brick);
  let shouldIterate = true;
  while (shouldIterate) {
    shouldIterate = false;
    for (let brick2 of otherBricksTemp) {
      let otherBricks3 = otherBricksTemp.filter(b => b !== brick2);
      if (!isOnTheFloor(brick2, otherBricks3)) {
        shouldIterate = true;
        otherBricksTemp = otherBricksTemp.filter(b => b !== brick2);
      }
    }
  }
  return otherBricks.length - otherBricksTemp.length;
}

let count = 0;
i = 0;
for (let brick of bricks) {
  console.log(`${i} of ${bricks.length}`);
  count += movingBrickCount(brick);
  i++;
}

console.log(count);

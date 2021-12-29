const input = `...#.
#.##.
#..##
#.###
##...`;

const testInput = `....#
#..#.
#..##
..#..
#....`;

let data = { 0: input.split("\n").map((el) => el.split("")) };

const getCell = (data, i, x, y) => {
  if (!data[i]) {
    return ".";
  }
  return data[i][x][y];
}

const bugCount = (data, i, x, y) => (getCell(data, i, x, y) === "#" ? 1 : 0);

const regularCount = (data, i, x, y) => {
  return (
    bugCount(data, i, x - 1, y) +
    bugCount(data, i, x + 1, y) +
    bugCount(data, i, x, y - 1) +
    bugCount(data, i, x, y + 1)
  );
};

const countBugs = (data, i, x, y) => {
  let nbBugs = 0;
  const count12 = bugCount(data, i - 1, 1, 2);
  const count14 = bugCount(data, i - 1, 3, 2);

  const count8 = bugCount(data, i - 1, 2, 1);
  const count18 = bugCount(data, i - 1, 2, 3);

  if (x === 0 && y === 0) {
    return (
      count8 +
      count12 +
      bugCount(data, i, x, y + 1) +
      bugCount(data, i, x + 1, y)
    );
  }

  if (x === 0 && y === 4) {
    return (
      count18 +
      count12 +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i, x + 1, y)
    );
  }

  if (x === 4 && y === 0) {
    return (
      count14 +
      count8 +
      bugCount(data, i, x, y + 1) +
      bugCount(data, i, x - 1, y)
    );
  }

  if (x === 4 && y === 4) {
    return (
      count14 +
      count18 +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i, x - 1, y)
    );
  }

  if (y === 2 && x === 2) {
    return -1;
  }

  if (y === 2 && x === 1) {
    return (
      bugCount(data, i, x - 1, y) +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i, x, y + 1) +
      bugCount(data, i + 1, 0, 0) +
      bugCount(data, i + 1, 0, 1) +
      bugCount(data, i + 1, 0, 2) +
      bugCount(data, i + 1, 0, 3) +
      bugCount(data, i + 1, 0, 4)
    );
  }

  if (y === 2 && x === 3) {
    return (
      bugCount(data, i, x + 1, y) +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i, x, y + 1) +
      bugCount(data, i + 1, 4, 0) +
      bugCount(data, i + 1, 4, 1) +
      bugCount(data, i + 1, 4, 2) +
      bugCount(data, i + 1, 4, 3) +
      bugCount(data, i + 1, 4, 4)
    );
  }
  if (x === 2 && y === 1) {
    return (
      bugCount(data, i, x + 1, y) +
      bugCount(data, i, x - 1, y) +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i + 1, 0, 0) +
      bugCount(data, i + 1, 1, 0) +
      bugCount(data, i + 1, 2, 0) +
      bugCount(data, i + 1, 3, 0) +
      bugCount(data, i + 1, 4, 0)
    );
  }
  if (x === 2 && y === 3) {
    return (
      bugCount(data, i, x + 1, y) +
      bugCount(data, i, x - 1, y) +
      bugCount(data, i, x, y + 1) +
      bugCount(data, i + 1, 0, 4) +
      bugCount(data, i + 1, 1, 4) +
      bugCount(data, i + 1, 2, 4) +
      bugCount(data, i + 1, 3, 4) +
      bugCount(data, i + 1, 4, 4)
    );
  }

  if (x === 0) {
    return (
      count12 +
      bugCount(data, i, x + 1, y) +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i, x, y + 1)
    );
  }
  if (x === 4) {
    return (
      count14 +
      bugCount(data, i, x - 1, y) +
      bugCount(data, i, x, y - 1) +
      bugCount(data, i, x, y + 1)
    );
  }
  if (y === 0) {
    return (
      count8 +
      bugCount(data, i, x - 1, y) +
      bugCount(data, i, x + 1, y) +
      bugCount(data, i, x, y + 1)
    );
  }
  if (y === 4) {
    return (
      count18 +
      bugCount(data, i, x - 1, y) +
      bugCount(data, i, x + 1, y) +
      bugCount(data, i, x, y - 1)
    );
  }

  return regularCount(data, i, x, y);
};

const advance = (data) => {
  const indexes = Object.keys(data);
  const min = Math.min(...indexes) - 1;
  const max = Math.max(...indexes) + 1;
  const newData = {};

  for (let i = min; i <= max; i++) {
    let floor = [];
    let cellCount = 0;
    for (let x = 0; x < 5; x++) {
      let line = [];
      for (let y = 0; y < 5; y++) {
        const nbBugs = countBugs(data, i, x, y);
        const cell = getCell(data, i, x, y);

        let newCell = cell;
        if (cell === "#") {
          if (nbBugs !== 1) {
            newCell = ".";
          }
        }
        if (cell === "." && [1, 2].includes(nbBugs)) {
          newCell = "#";
        }

        if (nbBugs === -1) {
          newCell === ".";
        }
        if (newCell === "#") {
          cellCount++;
        }
        line.push(newCell);
      }
      floor.push(line);
    }
    if (cellCount > 0) {
      newData[i] = floor;
    }
  }
  return newData;
};

const countTotalBugs = (data) => {
  return Object.values(data).flatMap((stage) =>
    stage.flatMap((el) => el.filter((cell) => cell === "#"))
  ).length;
};

for (let i = 0; i < 200; i++) {
  data = advance(data);
}

for (
  let i = Math.min(...Object.keys(data));
  i <= Math.max(...Object.keys(data));
  i++
) {
}
console.log(countTotalBugs(data));

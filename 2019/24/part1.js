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

const advance = (input) => {
  const data = input.split("\n");
  let res = [];
  return data.map((line, i) => {
    return line.split("").map((cell, j) => {
      const otherCells = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([dx, dy]) =>
        data[i + dx]?.[j + dy] || "."
      );
      const nbBugs = otherCells.filter(el => el === "#").length;

      if (cell === "#") {
        return nbBugs === 1 ? "#": ".";
      }
      if (cell === "." && [1, 2].includes(nbBugs)) {
        return "#";
      }
      return cell;
    }).join("");
  }).join("\n");
};
let current = input;

const layouts = new Set();
layouts.add(current);
while (true) {
  current = advance(current);
  if (layouts.has(current)) {
    break;
  }
  layouts.add(current);
}

const result = current.split("\n").flatMap(el => el.split("")).map((el, i) => el === "." ? 0 : Math.pow(2, i));
console.log(result.reduce((a, b) => a + b));

const fs = require("fs");

const data = fs.readFileSync("input").toString().split("\n");


let tiles = [];
let content = [];
let tileId;

for (const line of data) {
  if (line == "") {
    tiles.push({
      id: parseInt(tileId, 10),
      content,
    });
    content = [];
    continue;
  }
  if (line.startsWith("Tile")) {
    tileId = line.match(/Tile (\d+)/)[1];
  } else {
    content.push(line.split(""));
  }
}

const getBorders = (content) => {
  const borders = [];
  // top
  borders.push(content[0].join(""));
  // bottom
  borders.push(content[content.length - 1].join(""));
  // left
  borders.push(content.map((el) => el[0]).join(""));
  // right
  borders.push(content.map((el) => el[el.length - 1]).join(""));

  return borders;
};

tiles = tiles.map((tile) => ({borders: getBorders(tile.content), ...tile}));
let mult = 1;
const corners = tiles.filter((currentTile) => {
  let matchingTiles = tiles.filter((tile) => {
    if (tile.id === currentTile.id) {
      return false;
    }
    return tile.borders.some(
      (border) =>
        currentTile.borders.includes(border) ||
        currentTile.borders.includes(border.split("").reverse().join(""))
    );
  });
  return matchingTiles.length === 2;
});

const borderTiles = tiles.filter((currentTile) => {
  let matchingTiles = tiles.filter((tile) => {
    if (tile.id === currentTile.id) {
      return false;
    }
    return tile.borders.some(
      (border) =>
        currentTile.borders.includes(border) ||
        currentTile.borders.includes(border.split("").reverse().join(""))
    );
  });
  return matchingTiles.length === 3;
});

const middleTiles = tiles.filter((currentTile) => {
  let matchingTiles = tiles.filter((tile) => {
    if (tile.id === currentTile.id) {
      return false;
    }
    return tile.borders.some(
      (border) =>
        currentTile.borders.includes(border) ||
        currentTile.borders.includes(border.split("").reverse().join(""))
    );
  });
  return matchingTiles.length === 4;
});

const rotate = arr => arr[0].map((_, colIndex) => arr.map(row => row[row.length - 1 - colIndex]));

const flipHorizontal = (arr) =>
  arr.map(line => line.map((_, i) => line[line.length - i - 1]));

const getPermutations = (content) => {
  let permutations = [content];
  permutations = permutations.flatMap(el => [el, rotate(el), rotate(rotate(el)), rotate(rotate(rotate(el)))])
  permutations = permutations.flatMap(el => [el, flipHorizontal(el)])

  return permutations;
};

const printTiles = content => {
  console.log(content.map(el => el.join('')).join('\n'));
  console.log("\n\n");
};


const map = Array.from({ length: 5 }, _ => Array.from({ length: 29}))

const cornerPermutations = getPermutations(corners[0].content);

console.log(cornerPermutations.filter(perm => {
  const allBorders = getBorders(perm);
  const borders = [allBorders[1], allBorders[3]];
  let matchingTiles = borderTiles.filter((tile) => {
    return tile.borders.some(
      (border) =>
        borders.includes(border) ||
        borders.includes(border.split("").reverse().join(""))
    );
  });
  console.log(matchingTiles.length);
  if (matchingTiles.length === 2) {
    matchingTiles.forEach(el => printTiles(el.content))
  }

  return matchingTiles.length === 2;

}).length);


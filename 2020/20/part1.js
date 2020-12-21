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

const countBorders = (tile) => {
  const { content } = tile;
  const borders = [];
  borders.push(content[0].join(""));
  borders.push(content[content.length - 1].join(""));
  borders.push(content.map((el) => el[0]).join(""));
  borders.push(content.map((el) => el[el.length - 1]).join(""));

  return { ...tile, borders };
};

tiles = tiles.map((tile) => countBorders(tile));
let mult = 1;
for (let currentTile of tiles) {
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
  if (matchingTiles.length === 2) {
    mult *= currentTile.id;
  }
}

console.log(mult);

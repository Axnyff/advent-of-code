const fs = require("fs");

const data = fs.readFileSync("input").toString().split("\n");

const getBorders = (content: string[][]) => {
  return {
    top: content[0].join(""),
    bottom: content[content.length - 1].join(""),
    left: content.map((el) => el[0]).join(""),
    right: content.map((el) => el[el.length - 1]).join(""),
  };
};

let tiles: Array<{
  id: number;
  content: string[][];
  borders: string[];
}> = [];
let content = [];
let tileId;

for (const line of data) {
  if (line == "") {
    tiles.push({
      id: parseInt(tileId, 10),
      content,
      borders: Object.values(getBorders(content)),
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

const SIZE = Math.sqrt(tiles.length);

const corner = tiles.find((currentTile) => {
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
})!;

let otherTiles = tiles.filter(({ id }) => id !== corner.id);

const rotate = (arr: string[][]) =>
  arr[0].map((_, colIndex) => arr.map((row) => row[row.length - 1 - colIndex]));

const flipHorizontal = (arr: string[][]) =>
  arr.map((line) => line.map((_, i) => line[line.length - i - 1]));

const getPermutations = (content: string[][]): string[][][] => {
  let permutations = [content];
  permutations = permutations.flatMap((el) => [
    el,
    rotate(el),
    rotate(rotate(el)),
    rotate(rotate(rotate(el))),
  ]);
  permutations = permutations.flatMap((el) => [el, flipHorizontal(el)]);

  return permutations;
};

const cornerPermutations = getPermutations(corner.content);
const result = [[], []];

const map: { [K: string]: string[][] } = {};
const getKey = (i: number, j: number) => `${i}-${j}`;

let permutation = cornerPermutations.find((perm) => {
  const allBorders = getBorders(perm);
  const borders = [allBorders.right, allBorders.bottom];
  let matchingTiles = otherTiles.filter((tile) => {
    return tile.borders.some(
      (border) =>
        borders.includes(border) ||
        borders.includes(border.split("").reverse().join(""))
    );
  });
  return matchingTiles.length === 2;
})!;

map[getKey(0, 0)] = permutation;
let borders = getBorders(permutation);

let i = 0;
let j = 0;
while (true) {
  while (true) {
    j++;
    let tile = otherTiles.find((el) =>
      el.borders.some(
        (border) =>
          border === borders.right ||
          border.split("").reverse().join("") === borders.right
      )
    );
    if (tile === undefined) {
      i++;
      j = 0;
      break;
    } else {
      otherTiles = otherTiles.filter(({ id }) => id !== tile?.id);
    }
    let permutations = getPermutations(tile.content);

    let filtered = permutations.filter((permutation) => {
      const b = getBorders(permutation);
      return b.left === borders.right;
    });
    if (filtered.length > 1) {
      console.log("WAT");
    }
    permutation = filtered[0];
    borders = getBorders(permutation);
    map[getKey(i, j)] = permutation;
  }
  if (!otherTiles.length) {
    break;
  }
  borders = getBorders(map[getKey(i - 1, 0)]);

  let matchedTiles = otherTiles.filter((el) =>
    el.borders.some(
      (border) =>
        border === borders.bottom ||
        border.split("").reverse().join("") === borders.bottom
    )
  )!;
  if (matchedTiles.length > 1) {
    console.log("WAT");
  }

  let tile = matchedTiles[0];
  otherTiles = otherTiles.filter(({ id }) => id !== tile?.id);
  let permutations = getPermutations(tile.content);

  let filtered = permutations.filter((permutation) => {
    const b = getBorders(permutation);

    return b.top === borders.bottom;
  });
  permutation = filtered[0];
  borders = getBorders(permutation);
  map[getKey(i, j)] = permutation;
}

const image: string[] = [];

for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    let tile = map[getKey(i, j)];
    const cleanedTile = tile.slice(1, -1).map((el) => el.join("").slice(1, -1));
    const TILE_HEIGHT = cleanedTile.length;
    cleanedTile.forEach((line, indexLigne) => {
      image[i * TILE_HEIGHT + indexLigne] =
        (image[i * TILE_HEIGHT + indexLigne] || "") + line;
    });
  }
}

const imageArray2d = image.map((line) => line.split(""));
const seeMonstersSize = 15;
const nbMonsters = getPermutations(imageArray2d)
  .map((im) => im.map((el) => el.join("")))
  .map((permut) => {
    let nbMonsters = 0;
    const patterns = [
      /^..................#./,
      /^#....##....##....###/,
      /^.#..#..#..#..#..#.../,
    ];

    for (let i = 0; i < permut.length - 2; i++) {
      for (let j = 0; j < permut[0].length; j++) {
        if (patterns.every((pat, index) => pat.test(permut[i + index].slice(j)))) {
          nbMonsters++;
        }
      }
    }
    return nbMonsters;
  });

let totalHash = 0;
for (let i = 0; i < imageArray2d.length; i++) {
  for (let j = 0; j < imageArray2d[0].length; j++) {
    totalHash += imageArray2d[i][j] === "#" ? 1 : 0;
  }
}

const roughness = totalHash - Math.max(...nbMonsters) * seeMonstersSize;
console.log(roughness);

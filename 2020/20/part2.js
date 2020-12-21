"use strict";
var fs = require("fs");
var data = fs.readFileSync("input").toString().split("\n");
var getBorders = function (content) {
    return {
        top: content[0].join(""),
        bottom: content[content.length - 1].join(""),
        left: content.map(function (el) { return el[0]; }).join(""),
        right: content.map(function (el) { return el[el.length - 1]; }).join("")
    };
};
var tiles = [];
var content = [];
var tileId;
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var line = data_1[_i];
    if (line == "") {
        tiles.push({
            id: parseInt(tileId, 10),
            content: content,
            borders: Object.values(getBorders(content))
        });
        content = [];
        continue;
    }
    if (line.startsWith("Tile")) {
        tileId = line.match(/Tile (\d+)/)[1];
    }
    else {
        content.push(line.split(""));
    }
}
var corner = tiles.find(function (currentTile) {
    var matchingTiles = tiles.filter(function (tile) {
        if (tile.id === currentTile.id) {
            return false;
        }
        return tile.borders.some(function (border) {
            return currentTile.borders.includes(border) ||
                currentTile.borders.includes(border.split("").reverse().join(""));
        });
    });
    return matchingTiles.length === 2;
});
var otherTiles = tiles.filter(function (_a) {
    var id = _a.id;
    return id !== corner.id;
});
var rotate = function (arr) { return arr[0].map(function (_, colIndex) { return arr.map(function (row) { return row[row.length - 1 - colIndex]; }); }); };
var flipHorizontal = function (arr) {
    return arr.map(function (line) { return line.map(function (_, i) { return line[line.length - i - 1]; }); });
};
var getPermutations = function (content) {
    var permutations = [content];
    permutations = permutations.flatMap(function (el) { return [el, rotate(el), rotate(rotate(el)), rotate(rotate(rotate(el)))]; });
    permutations = permutations.flatMap(function (el) { return [el, flipHorizontal(el)]; });
    return permutations;
};
var printTiles = function (content) {
    console.log(content.map(function (el) { return el.join(''); }).join('\n'));
    console.log("\n\n");
};
var map = Array.from({ length: 5 }, function (_) { return Array.from({ length: 29 }); });
var cornerPermutations = getPermutations(corner.content);
console.log(cornerPermutations.filter(function (perm) {
    var allBorders = getBorders(perm);
    var borders = [allBorders.right, allBorders.bottom];
    var matchingTiles = otherTiles.filter(function (tile) {
        return Object.values(getBorders(tile.content)).some(function (border) {
            return borders.includes(border) ||
                borders.includes(border.split("").reverse().join(""));
        });
    });
    console.log(matchingTiles.length);
    if (matchingTiles.length === 2) {
        matchingTiles.forEach(function (el) { return printTiles(el.content); });
    }
    return matchingTiles.length === 2;
}).length);

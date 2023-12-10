let inp = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n");

let mmap = [];
for (let y = 0; y < inp.length * 3; y++) {
  mmap[y] = [];
  for (let x = 0; x < inp[0].length * 3; x++) {
    mmap[y][x] = ".";
  }
}

let start = [];
for (let y in inp) {
  if (inp[y].indexOf("S") >= 0) {
    start = [+y, inp[y].indexOf("S")];
  }
}

let dx = 0;
let dy = 1;
let py = start[0];
let px = start[1];
let steps = 0;
do {
  steps++;
  px += dx;
  py += dy;

  let c = inp[py][px];
  mmap[3 * py + 1][3 * px + 1] = "#";
  mmap[3 * py + 1 - dy][3 * px + 1 - dx] = "#";
  if (c == "J" || c == "F") {
    [dx, dy] = [-dy, -dx];
  } else if (c == "7" || c == "L") {
    [dx, dy] = [dy, dx];
  }
  mmap[3 * py + 1 + dy][3 * px + 1 + dx] = "#";

} while (py != start[0] || px != start[1]);
console.log(steps / 2);

//bfs from corner to find all outside spots
let queue = [[0, 0]];
while (queue.length > 0) {
  let [cy, cx] = queue.pop();
  mmap[cy][cx] = " ";

  if (cy > 0 && mmap[cy - 1][cx] == ".") queue.push([cy - 1, cx]);
  if (cx > 0 && mmap[cy][cx - 1] == ".") queue.push([cy, cx - 1]);
  if (cy < mmap.length - 1 && mmap[cy + 1][cx] == ".") queue.push([cy + 1, cx]);
  if (cx < mmap[0].length - 1 && mmap[cy][cx + 1] == ".")
    queue.push([cy, cx + 1]);
}

let ret = 0;
for (let y = 1; y < mmap.length; y += 3) {
  for (let x = 1; x < mmap[0].length; x += 3) {
    if (mmap[y][x] == ".") ret++;
  }
}
console.log(ret);

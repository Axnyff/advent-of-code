const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split(""));

let beams = [[lines[0].findIndex((el) => el === "S"), 1]];
let split = 0;
for (let line of lines) {
  let newBeams = {};
  for (let [rawBeam, count] of beams) {
    const beam = Number(rawBeam);
    if (line[beam] === "^") {
      split++;
      if (newBeams[beam + 1]) {
        newBeams[beam + 1] += count;
      } else {
        newBeams[beam + 1] = count;
      }
      if (newBeams[beam - 1]) {
        newBeams[beam - 1] += count;
      } else {
        newBeams[beam - 1] = count;
      }
    } else {
      if (newBeams[beam]) {
        newBeams[beam] += count;
      } else {
        newBeams[beam] = count;
      }
    }
  }
  beams = Object.entries(newBeams);
}
console.log(beams.map((b) => b[1]).reduce((a, b) => a + b));

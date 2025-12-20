const lines = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((el) => el.split(""));

let beams = [lines[0].findIndex((el) => el === "S")];
let split = 0;
for (let line of lines) {
  let newBeams = new Set();
  for (let beam of beams) {
    if (line[beam] === "^") {
      split++;
      newBeams.add(beam - 1);
      newBeams.add(beam + 1);
    } else {
      newBeams.add(beam);
    }
  }
  beams = [...newBeams];
}
console.log(split);

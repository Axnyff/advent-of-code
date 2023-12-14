const patterns = require("fs").readFileSync("input").toString().slice(0, -1).split("\n\n").map(p => p.split("\n").map(l => l.split("")));

const findVerticalPattern = (pattern, ignore) => {
  outer: for (let i = 1; i < pattern[0].length; i++) {
    line: for (let j = 0; j < pattern.length; j++) {
      let k = 1;
      while (true) {
        let a = pattern[j][i - k]
        let b = pattern[j][i + k - 1];

        if (a === undefined || b === undefined) {
          continue line;
        }
        if (a !== b) {
          continue outer;
        }
        k++;
      }
    }
    if (ignore === i) {
      continue;
    }
    return i;
  }
};

const findHorizontalPattern = (pattern, ignore) => {
  outer: for (let i = 1; i < pattern.length; i++) {
    line: for (let j = 0; j < pattern[0].length; j++) {
      let k = 1;
      while (true) {
        let a = pattern[i -k]?.[j]
        let b = pattern[i + k - 1]?.[j];
        if (a === undefined || b === undefined) {
          continue line;
        }
        if (a !== b) {
          continue outer;
        }
        k++;
      }
    }
    if (ignore === i) {
      continue;
    }
    return i;
  }
};
let vertical = 0;
let horizontal = 0;
for (let pattern of patterns) {
  let horiz = findHorizontalPattern(pattern);
  if (!horiz) {
    vertical += findVerticalPattern(pattern);
  } else {
    horizontal += horiz;
  }
}
console.log(horizontal * 100 + vertical);

vertical = 0;
horizontal = 0;

const printPattern = (pattern) => {
  console.log(pattern.map(l => l.join("")).join("\n"));
  console.log("\n\n");
}
outer: for (let pattern of patterns) {
  const horizInit = findHorizontalPattern(pattern);
  const vertInit = findVerticalPattern(pattern);
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[0].length; j++) {
      pattern[i][j] = pattern[i][j] === "#" ? "." : "#";
      let horiz = findHorizontalPattern(pattern, horizInit);
      if (!horiz) {
        let vert = findVerticalPattern(pattern, vertInit);
        if (vert) {
          vertical += vert;
          continue outer;
        }
      } else {
        horizontal += horiz;
        continue outer;
      }
      pattern[i][j] = pattern[i][j] === "#" ? "." : "#";
    }
  }
  throw patterns.indexOf(pattern);
}
console.log(horizontal * 100 + vertical);

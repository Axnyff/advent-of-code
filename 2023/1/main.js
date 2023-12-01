const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");

const result1 = lines.map(l =>  {
  const matchFirst = l.match(/^[a-z]*(\d).*$/);
  const matchLast = l.match(/^.*(\d)[a-z]*$/);

  return matchFirst[1] * 10 + Number(matchLast[1]);
}).reduce((a, b) => a + b);


let matchLine = (l) => {
  let i = 0;
  while (true) {
    if (l[i].match(/\d/)) {
      return Number(l[i])
    }
    if (l.slice(i).startsWith("one")) {
      return 1;
    }
    if (l.slice(i).startsWith("two")) {
      return 2;
    }
    if (l.slice(i).startsWith("three")) {
      return 3;
    }
    if (l.slice(i).startsWith("four")) {
      return 4;
    }
    if (l.slice(i).startsWith("five")) {
      return 5;
    }
    if (l.slice(i).startsWith("six")) {
      return 6;
    }
    if (l.slice(i).startsWith("seven")) {
      return 7;
    }
    if (l.slice(i).startsWith("eight")) {
      return 8;
    }
    if (l.slice(i).startsWith("nine")) {
      return 9;
    }
    i++;
  }
};

let matchLineRev = (l) => {
  let i = l.length - 1;
  while (true) {
    if (l[i].match(/\d/)) {
      return Number(l[i])
    }
    if (l.slice(i).startsWith("one")) {
      return 1;
    }
    if (l.slice(i).startsWith("two")) {
      return 2;
    }
    if (l.slice(i).startsWith("three")) {
      return 3;
    }
    if (l.slice(i).startsWith("four")) {
      return 4;
    }
    if (l.slice(i).startsWith("five")) {
      return 5;
    }
    if (l.slice(i).startsWith("six")) {
      return 6;
    }
    if (l.slice(i).startsWith("seven")) {
      return 7;
    }
    if (l.slice(i).startsWith("eight")) {
      return 8;
    }
    if (l.slice(i).startsWith("nine")) {
      return 9;
    }
    i--;
  }
};

const result2 = lines.map(line => {
  return matchLine(line) * 10 + matchLineRev(line);
}).reduce((a, b) => a + b);

console.log(result2);

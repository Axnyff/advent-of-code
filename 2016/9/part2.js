const input = require('fs').readFileSync("input").toString().trim();
const getStringLength = (s) => {
  if (!s.includes("(")) {
    return s.length;
  }

  const index = s.indexOf("(");
  const match = s.match(/(\d+)x(\d+)/);
  const chars = parseInt(match[1]);
  const repeat = parseInt(match[2]);

  const start = index + match[0].length + 2;
  const end = start + chars;
  return index + repeat * getStringLength(s.slice(start, end)) + getStringLength(s.slice(end));
};

console.log(getStringLength(input));

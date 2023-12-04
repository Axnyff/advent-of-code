const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n").map((raw, i) => {
  const [, b] = raw.split(/:\s+/);
  const [bef, aft] = b.split(/\s+\|\s+/);

  const winnings = bef.split(/\s+/).map(Number);
  const cards = aft.split(/\s+/).map(Number);

  const score =  cards.reduce((score, card) => {
    const isWinning = winnings.includes(card);
    if (isWinning) {
      return score === 0 ? 1 : score * 2;
    }
    return score;
  }, 0);
  return score;
});;

const lines2 = require("fs").readFileSync("input").toString().slice(0, -1).split("\n").map((raw, i) => {
  const [, b] = raw.split(/:\s+/);
  const [bef, aft] = b.split(/\s+\|\s+/);

  const winnings = bef.split(/\s+/).map(Number);
  const cards = aft.split(/\s+/).map(Number);

  const score =  cards.reduce((score, card) => {
    const isWinning = winnings.includes(card);
    if (isWinning) {
      return score + 1;
    }
    return score;
  }, 0);
  return score;
});;

console.log(lines.reduce((a, b) => a + b));

const copies = Object.fromEntries(lines2.map((_, i) => [i, 1]));

for (let i = 0; i < lines2.length; i++) {
  let score = lines2[i];
  for (let j = 0; j < score; j++) {
    if (copies[j + 1]) {
      copies[i + j + 1] = copies[i + j + 1] + copies[i];
    }
  }
}

console.log(Object.values(copies).reduce((a, b) => a + b));

const rawLines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");

const data = {
  "red": 12,
  "green": 13,
  "blue": 14,
};

const lines = rawLines.map(line => {
  const [rawId, rawSets] = line.split(": ");
  const id = parseInt(rawId.slice(5))

  const sets = rawSets.split("; ").map(set => {
    return set.split(", ").map(i => {
      const [a, b] = i.split(" ");
      return [Number(a), b];
    });
  });
  return {
    id,
    sets,
  };
})

const result1 = lines.filter(game => {
  return game.sets.every(set => set.every(([count, color]) => {
    return count <= data[color];
  }));
}).reduce((total, game) => total + game.id, 0);

const result2 = lines.map(line => {
  return line.sets.flat().reduce((totals, [count, color]) => {
    if (totals[color] < count) {
      return {
        ...totals,
        [color]: count,
      };
    }
    return totals;
  }, {
    green: 0,
    red: 0,
    blue: 0,
  });
}).map(totals => totals.blue * totals.green * totals.red).reduce((a, b) => a + b);

console.log(result1);
console.log(result2);

const favorite = 1350;
const target = "31-39"

const getKey = (x, y) => `${x}-${y}`;
const isWall = (x, y) => {
  const value = x*x + 3 * x + 2* x * y + y + y*y + favorite;
  return (value.toString(2).match(/1/g) || []).length % 2 === 1;
};

let iter = 0;
let explored = new Set();
let toexplore = new Set();
toexplore.add(getKey(1, 1));
explored.add(getKey(1, 1));
while (iter < 50) {
  iter++;
  let newtoexplore = new Set();
  for (let pos of toexplore) {
    let [x, y] = pos.split("-").map(Number);
    const possibles = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ].filter(([x, y]) => x >= 0 && y >= 0);
    possibles.forEach(possible => {
      if (!isWall(...possible)) {
        const key = getKey(...possible);
        newtoexplore.add(key);
        explored.add(key);
      }
    });
  }
  toexplore = newtoexplore;
}
console.log(explored.size);

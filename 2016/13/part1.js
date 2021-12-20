const favorite = 1350;
const target = "31-39"

const getKey = (x, y) => `${x}-${y}`;
const isWall = (x, y) => {
  const value = x*x + 3 * x + 2* x * y + y + y*y + favorite;
  return (value.toString(2).match(/1/g) || []).length % 2 === 1;
};

let iter = 0;
let done = false;
let toexplore = new Set();
toexplore.add(getKey(1, 1));
while (!done) {
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
        if (key === target) {
          done = true;
        }
        newtoexplore.add(getKey(...possible));
      }
    });
  }
  toexplore = newtoexplore;
}
console.log(iter);

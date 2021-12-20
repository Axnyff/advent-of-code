const discs = [
  [13, 11],
  [5, 0],
  [17, 11],
  [3, 0],
  [7, 2],
  [19, 17],
];

let time = 0;
let advance = 1;

let discIndex = 0;

for (let discIndex = 0; discIndex < discs.length; discIndex++) {
  const [mod, offset] = discs[discIndex];

  while ( ((offset + time + discIndex + 1) % mod) !== 0) {
    time = time + advance;
  }
  advance *= mod;
  console.log(time);
}

// WAT
const { modInv, modPow } = require("bigint-crypto-utils");

const instructions = require("fs")
  .readFileSync("input")
  .toString()
  .trimEnd()
  .split("\n");

const handleInstruction = (deck, instruction) => {
  match = instruction.match(/(-?\d+)/);
  const count = Number(match[1]);
  return cut(deck, count);
};

const times = 101741582076661n;
const deckSize = 119315717514047n;
const cardPosition = 2020n;

let incMultiplier = 1n;
let offsetDiff = 0n;

for (let instruction of instructions) {
  let match = instruction.match(/deal with increment (\d+)/);
  if (match) {
    const val = BigInt(Number(match[1]));
    incMultiplier = (incMultiplier * modInv(val, deckSize)) % deckSize;
    continue;
  }
  match = instruction.match(/deal/);
  if (match) {
    incMultiplier = -incMultiplier % deckSize;
    offsetDiff = (offsetDiff + incMultiplier) % deckSize;
    continue;
  }
  match = instruction.match(/(-?\d+)/);
  const val = BigInt(Number(match[1]));
  offsetDiff = (offsetDiff + val * incMultiplier) % deckSize;
}
const inc = modPow(incMultiplier, times, deckSize);
let offset =
  (offsetDiff *
    (1n - inc) *
    modInv((1n - incMultiplier) % deckSize, deckSize)) %
  deckSize;
console.log(Number((offset + inc * cardPosition) % deckSize));

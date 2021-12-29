const instructions = require('fs').readFileSync('input').toString().trimEnd().split('\n');

let deck = Array.from({ length: 10007}, (_, i) => i);

const newStack = (input) => {
  return input.reverse();
};

const cut = (input, amount) => {
  return input.slice(amount).concat(input.slice(0, amount));
};

const deal = (input, amount) => {
  const result = Array.from({ length: input.length});
  const itemCount = 0;
  let position = 0;
  while (input.length) {
    result[position] = input.shift();
    position += amount;
    position = position % result.length;
  };
  return result;
};

const handleInstruction = (deck, instruction) => {
  let match = instruction.match(/deal with increment (\d+)/);
  if (match) {
    const count = Number(match[1]);
    return deal(deck, count);
  }
  match = instruction.match(/deal/);
  if (match) {
    return newStack(deck);
  }
  match = instruction.match(/(-?\d+)/);
  const count = Number(match[1]);
  return cut(deck, count);
};

for (let instruction of instructions) {
  deck = handleInstruction(deck, instruction);
}
for (let i = 0; i < 10007; i++) {
  if (deck[i] === 2019) {
    console.log(i);
    return;
  }
}

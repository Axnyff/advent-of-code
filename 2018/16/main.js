const fs = require('fs');

const content = fs.readFileSync('input').toString().slice(0, -1);

const [rawTestLines, rawLines] = content.split("\n\n\n\n");

const testLines = rawTestLines.split("\n\n").map(el => el.split("\n"));
const lines = rawLines.split("\n");
console.log(lines[0]);

const operations = [
  {
    name: 'addr',
    code: 14,
    apply: (regs, a, b, c) => regs[c] = regs[a] + regs[b],
  },
  {
    name: 'addi',
    code: 0,
    apply: (regs, a, b, c) => regs[c] = regs[a] + b,
  },
  {
    name: 'mulr',
    code: 15,
    apply: (regs, a, b, c) => regs[c] = regs[a] * regs[b],
  },
  {
    name: 'muli',
    code: 8,
    apply: (regs, a, b, c) => regs[c] = regs[a] * b,
  },
  {
    name: 'banr',
    code: 10,
    apply: (regs, a, b, c) => regs[c] = regs[a] & regs[b],
  },
  {
    name: 'bani',
    code: 1,
    apply: (regs, a, b, c) => regs[c] = regs[a] & b,
  },
  {
    name: 'borr',
    code: 3,
    apply: (regs, a, b, c) => regs[c] = regs[a] | regs[b],
  },
  {
    name: 'bori',
    code: 5,
    apply: (regs, a, b, c) => regs[c] = regs[a] | b,
  },
  {
    name: 'setr',
    code: 7,
    apply: (regs, a, b, c) => regs[c] = regs[a],
  },
  {
    name: 'seti',
    code: 9,
    apply: (regs, a, b, c) => regs[c] = a,
  },
  {
    code: 2,
    name: 'gtir',
    apply: (regs, a, b, c) => regs[c] = a > regs[b] ? 1 : 0,
  },
  {
    code: 11,
    name: 'gtri',
    apply: (regs, a, b, c) => regs[c] = regs[a] > b ? 1 : 0,
  },
  {
    name: 'gtrr',
    code: 6,
    apply: (regs, a, b, c) => regs[c] = regs[a] > regs[b] ? 1 : 0,
  },
  {
    name: 'eqir',
    code: 12,
    apply: (regs, a, b, c) => regs[c] = a === regs[b] ? 1 : 0,
  },
  {
    name: 'eqri',
    code: 13,
    apply: (regs, a, b, c) => regs[c] = regs[a] === b ? 1 : 0,
  },
  {
    code: 4,
    name: 'eqrr',
    apply: (regs, a, b, c) => regs[c] = regs[a] === regs[b] ? 1 : 0,
  },
];

const regs = [0, 0, 0, 0];

for (let line of lines) {
  const instruction = line.split(" ").map(Number);
  operations.find(op => op.code === instruction[0]).apply(regs, ...instruction.slice(1));
}
console.log(regs);

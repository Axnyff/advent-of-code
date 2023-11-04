const fs = require('fs');

const content = fs.readFileSync('input').toString().slice(0, -1);

const lines = content.split("\n").map(line => ({
  code: line.split(" ")[0],
  content: line.split(" ").slice(1).map(Number),
}));

const rawOperations = [
  {
    name: 'addr',
    code: 14,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] + regs[b],
  },
  {
    name: 'addi',
    code: 0,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] + b,
  },
  {
    name: 'mulr',
    code: 15,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] * regs[b],
  },
  {
    name: 'muli',
    code: 8,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] * b,
  },
  {
    name: 'banr',
    code: 10,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] & regs[b],
  },
  {
    name: 'bani',
    code: 1,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] & b,
  },
  {
    name: 'borr',
    code: 3,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] | regs[b],
  },
  {
    name: 'bori',
    code: 5,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] | b,
  },
  {
    name: 'setr',
    code: 7,
    apply: (regs, [a, b, c]) => regs[c] = regs[a],
  },
  {
    name: 'seti',
    code: 9,
    apply: (regs, [a, b, c]) => regs[c] = a,
  },
  {
    code: 2,
    name: 'gtir',
    apply: (regs, [a, b, c]) => regs[c] = a > regs[b] ? 1 : 0,
  },
  {
    code: 11,
    name: 'gtri',
    apply: (regs, [a, b, c]) => regs[c] = regs[a] > b ? 1 : 0,
  },
  {
    name: 'gtrr',
    code: 6,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] > regs[b] ? 1 : 0,
  },
  {
    name: 'eqir',
    code: 12,
    apply: (regs, [a, b, c]) => regs[c] = a === regs[b] ? 1 : 0,
  },
  {
    name: 'eqri',
    code: 13,
    apply: (regs, [a, b, c]) => regs[c] = regs[a] === b ? 1 : 0,
  },
  {
    code: 4,
    name: 'eqrr',
    apply: (regs, [a, b, c]) => regs[c] = regs[a] === regs[b] ? 1 : 0,
  },
];


const operations = {};
for (let op of rawOperations) {
  operations[op.name] = op;
}

const p = 1;
const regs = [1, 0, 0, 0, 0, 0];

for (let i = 3; i < 12; i++) {
  if (i === 7) {
    continue;
  }
  console.log(lines[i]);
}
const run = async () => {
  console.log("START");
  while (lines[regs[p]]) {
    if (regs[p] === 3) {
      regs[2] = target;
    }
    const instruction = lines[regs[p]];
    if (regs[p] === 3) {
      console.log(regs[p], instruction);
    }
    operations[instruction.code].apply(regs, instruction.content);
    regs[p]++;
    if (regs[p] === 3) {
      console.log(regs)
    }
  }
};
run();
console.log(regs)

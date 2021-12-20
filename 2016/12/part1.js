const lines = require('fs').readFileSync('input').toString().trim().split("\n");
const reg = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
};

let index = 0;
let nbIter = 0;
while (index < lines.length) {
  nbIter++;
  let instruction = lines[index];
  if (instruction.startsWith('cpy')) {
    const match = instruction.match(/cpy (\w+) (\w+)/);
    const target = match[2];

    const raw_value = match[1];
    const value = raw_value.match(/\d+/) ? parseInt(raw_value): reg[raw_value];
    reg[target] = value;
    index++;
    continue;
  }
  if (instruction.startsWith('inc')) {
    const match = instruction.match(/inc (\w+)/);
    const target = match[1];
    reg[target] = reg[target] + 1;
    index++;
    continue;
  }
  if (instruction.startsWith('dec')) {
    const match = instruction.match(/dec (\w+)/);
    const target = match[1];
    reg[target] = reg[target] - 1;
    index++;
    continue;
  }
  if (instruction.startsWith('jnz')) {
    const match = instruction.match(/jnz (\w+) (-?\w+)/)
    const raw_check = match[1];
    const check = raw_check.match(/\d+/) ? parseInt(raw_check): reg[raw_check];
    const value = parseInt(match[2]);
    if (check !== 0) {
      index += value;
    } else {
      index++;
    }
  }
}
console.log(reg.a);

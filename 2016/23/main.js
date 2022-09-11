const lines = require('fs').readFileSync('input').toString().trim().split("\n");
const reg = {
  a: 12,
  b: 0,
  c: 0,
  d: 0,
};

let index = 0;
let nbIter = 0;
while (index < lines.length) {
  nbIter++;
  let instruction = lines[index];
  if (instruction.startsWith('tgl')) {
    const match = instruction.match(/tgl (\w+)/);
    const raw_value = match[1];
    const value = raw_value.match(/\d+/) ? parseInt(raw_value): reg[raw_value];
    const target = index + value;
    let targetLine = lines[target];
    if (targetLine) {
      if (targetLine.startsWith('inc')) {
        targetLine = targetLine.replace('inc', 'dec');
      } else if (targetLine.startsWith('dec')) {
        targetLine = targetLine.replace('dec', 'inc');
      } else if (targetLine.startsWith('tgl')) {
        targetLine = targetLine.replace('tgl', 'inc');
      } else if (targetLine.startsWith('jnz')) {
        targetLine = targetLine.replace('jnz', 'cpy');
      } else if (targetLine.startsWith('cpy')) {
        targetLine = targetLine.replace('cpy', 'jnz');
      }
      lines[target] = targetLine;
    }

    index++;
    continue;
  }

  if (instruction.startsWith('cpy')) {
    const match = instruction.match(/cpy (-?\w+) (-?\w+)/);
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
    const match = instruction.match(/jnz (-?\w+) (-?\w+)/)
    const raw_check = match[1];
    const check = raw_check.match(/\d+/) ? parseInt(raw_check): reg[raw_check];
    const raw_check_2 = match[2];
    const value = raw_check_2.match(/\d+/) ? parseInt(raw_check_2): reg[raw_check_2];
    if (check !== 0) {
      index += value;
    } else {
      index++;
    }
  }
}
console.log(reg.a);
const res = [
  8383,
  12703,
  47983,
  370543,
  3636463
]

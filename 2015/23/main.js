const fs = require("fs");

const lines = fs.readFileSync("input").toString().split("\n").slice(0, -1);

const registers = {
  a: 1,
  b: 0,
};

let step = 0;
const instructions = {
  hlf: (reg) => {
    registers[reg] = registers[reg] / 2;
    step++;
  },
  tpl: (reg) => {
    registers[reg] = registers[reg] * 3;
    step++;
  },
  inc: (reg) => {
    registers[reg] = registers[reg] + 1;
    step++;
  },
  jmp: (offset) => {
    step += offset;
  },
  jie: (reg, offset) => {
    if (registers[reg] % 2 === 0) {
      step += offset;
    } else {
      step++;
    }
  },
  jio: (reg, offset) => {
    if (registers[reg] === 1) {
      step += offset;
    } else {
      step++;
    }
  },
};

const executeLine = (line) => {
  const parts = line.replace(",", "").split(" ");
  console.log(parts);
  if (parts[0] === "jmp") {
    instructions[parts[0]](parseInt(parts[1]));
  } else {
    instructions[parts[0]](parts[1], parseInt(parts[2]));
  }

};

while (step < lines.length) {
  executeLine(lines[step]);
}

console.log(registers);


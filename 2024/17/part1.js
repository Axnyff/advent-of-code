const fs = require("fs");

let [raw_registers, raw_program] = fs
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n");

let regs = {};
raw_registers.split("\n").forEach((r, i) => {
  const [_, num] = r.split(": ");
  regs[i] = Number(num);
});
raw_program = raw_program.slice(9);
let program = raw_program.split(",").map(Number);

const getCombo = (num) => {
  if (num < 4) {
    return num;
  }
  if (num > 6) {
    throw "WAT";
  }
  return regs[num - 4];
};

const runProgram = (i, output = false) => {
  let position = 0;

  regs["0"] = i;
  regs["1"] = 0;
  regs["2"] = 0;
  const out = [];
  while (position < program.length) {
    switch (program[position]) {
      case 0: {
        // COMBO
        const num = regs["0"];
        const dem = BigInt(getCombo(program[position + 1])) ** 2n;
        regs["0"] = num / dem;
        position += 2;
        continue;
      }
      case 1: {
        const res = BigInt(regs[1]) ^ BigInt(program[position + 1]);
        regs["1"] = res;
        position += 2;
        continue;
      }
      case 2: {
        // COMBO
        const res = BigInt(getCombo(program[position + 1])) % 8n;
        regs["1"] = res;
        position += 2;
        continue;
      }
      case 3: {
        if (regs["0"] !== 0) {
          position = program[position + 1];
        } else {
          position += 2;
        }
        continue;
      }
      case 4: {
        const res = regs["1"] ^ regs["2"];
        regs["1"] = res;
        position += 2;
        continue;
      }
      case 5: {
        // COMBO
        out.push(getCombo(program[position + 1]) % 8n);
        position += 2;
        continue;
      }
      case 6: {
        // COMBO
        const num = regs["0"];
        const dem = BigInt(getCombo(program[position + 1])) ** 2n;
        regs["1"] = num / dem;
        position += 2;
        continue;
      }
      case 7: {
        // COMBO
        const num = regs["0"];
        const dem = BigInt(getCombo(program[position + 1])) ** 2n;
        console.log(dem)
        regs["2"] = num / dem;
        position += 2;
        continue;
      }
    }
  }
  const res = out.join(",");
  return res;
};
for (let i = 0; i < 100; i++) {}

const e = 8n;
const number =
  e *
  (e *
    (e * (e * (e * (e * (e * e * (e * (24n * e + 3n) + 3n) + 4n) + 6n) + 3n) + 3n) +
      4n) +
    4n) + 4n
;
console.log(49999999999999999999n ^ 4n)

console.log(number.toString(2))
console.log(runProgram(number));
// for (let i = 0; i < 10000000; i++) {
//   const test = number + i;
//   if (runProgram(number).startsWith("1")) {
//     console.log(i);
//     break;
//   }
// }

const instructions = require('fs').readFileSync("input").toString().trim().split("\n");

const bots = {};
const output = {};

const giveToBot = (bot, value) => {
  const values = (bots[bot] || []).concat(value);
  if (values.length === 2) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const instruction = instructions.find(instruction => instruction.startsWith("bot " + bot + " gives"));
    const match = instruction.match(/low to (\w+) (\d+) and high to (\w+) (\d+)/);

    const low = parseInt(match[2]);
    const high = parseInt(match[4]);
    if (match[1] === "bot") {
      giveToBot(low, min);
    } else {
      output[low] = min;
    }
    if (match[3] === "bot") {
      giveToBot(high, max);
    } else {
      output[high] = max;
    }
  } else {
    bots[bot] = values;
  }
};

for (let instruction of instructions) {
  if (instruction.startsWith("bot")) {
    continue;
  }
  const match = instruction.match(/(\d+) goes to bot (\d+)/);
  const value = parseInt(match[1]);
  const bot = parseInt(match[2]);
  giveToBot(bot, value);
}

console.log(output[0] * output[1] * output[2]);

const instructions = require('fs').readFileSync("input").toString().trim().split("\n");

const bots = {};

const giveToBot = (bot, value) => {
  const values = (bots[bot] || []).concat(value);
  if (values.length === 2) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const instruction = instructions.find(instruction => instruction.startsWith("bot " + bot + " gives"));
    const match = instruction.match(/low to bot (\d+) and high to bot (\d+)/);

    if (min === 17 && max === 61) {
      console.log(bot);
    }
    if (!match) {
    } else {
      const lowbot = parseInt(match[1]);
      const highbot = parseInt(match[2]);

      giveToBot(lowbot, min);
      giveToBot(highbot, max);
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

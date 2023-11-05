// const blueprints = [
//   {
//     ore: 4,
//     clay: 2,
//     obsidian: [3, 14],
//     geode: [2, 7],
//   },
//   {
//     ore: 2,
//     clay: 3,
//     obsidian: [3, 8],
//     geode: [3, 12],
//   },
// ];

const blueprints = require("fs").readFileSync("input").toString().slice(0, -1).split("\n").slice(0, 3).map(l => {
  const matches = [...l.matchAll(/\d+/g)];
  return {
    ore: Number(matches[1]),
    clay: Number(matches[2]),
    obsidian: [Number(matches[3]), Number(matches[4])],
    geode: [Number(matches[5]), Number(matches[6])],
  };
});

const computeState = (blueprint, events) => {
  let state = {
    oreBot: 1,
    clayBot: 0,
    obsidianBot: 0,
    geodeBot: 0,
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
    time: 0,
  };
  for (let event of events) {
    state.ore += state.oreBot;
    state.clay += state.clayBot;
    state.obsidian += state.obsidianBot;
    state.geode += state.geodeBot;
    if (event === "G") {
      state.ore -= blueprint.geode[0];
      state.obsidian -= blueprint.geode[1];
      state.geodeBot++;
    }
    if (event === "B") {
      state.ore -= blueprint.obsidian[0];
      state.clay -= blueprint.obsidian[1];
      state.obsidianBot++;
    }
    if (event === "O") {
      state.ore -= blueprint.ore;
      state.oreBot++;
    }
    if (event === "C") {
      state.ore -= blueprint.clay;
      state.clayBot++;
    }
  }
  state.time = events.length;
  return state;
};

const getMaxOutputForBluePrint = (blueprint) => {
  let toExplore = new Set();
  toExplore.add("");
  let maxGeode = 0;
  while (toExplore.size) {
    let newToExplore = new Set();
    for (let events of toExplore) {
      const state = computeState(blueprint, events);
      if (state.time >= 32) {
        if (state.geode > maxGeode) {
          maxGeode = Math.max(maxGeode, state.geode);
        }
        continue;
      }

      const maxOreBots = Math.max(blueprint.clay, blueprint.obsidian[0], blueprint.geode[0]);
      const maxClayBots = blueprint.obsidian[1];
      const maxObsidianBots = blueprint.geode[1];
      let add = false;
      // buy ore
      const oreMissing = blueprint.ore - state.ore;
      const oreTime = Math.ceil(oreMissing / state.oreBot);
      if (events.length + oreTime <= 31 - 20 && state.oreBot < maxOreBots) {
        add = true;
        newToExplore.add(events + "".padEnd(oreTime, "W") + "O");
      }

      // buy clay
      const oreMissing2 = blueprint.clay - state.ore;
      const clayTime = Math.ceil(oreMissing2 / state.oreBot);
      if (events.length + clayTime <= 30 - 10 && state.clayBot < maxClayBots) {
        add = true;
        newToExplore.add(events + "".padEnd(clayTime, "W") + "C");
      }

      if (state.clayBot) {
        // buy obsidian
        const oreMissing = blueprint.obsidian[0] - state.ore;
        const clayMissing = blueprint.obsidian[1] - state.clay;

        const obsidianTime = Math.max(
          Math.ceil(clayMissing / state.clayBot),
          Math.ceil(oreMissing / state.oreBot)
        );
        if (events.length + obsidianTime <= 30 && state.obsidianBot < maxObsidianBots) {
          add = true;
          newToExplore.add(events + "".padEnd(obsidianTime, "W") + "B");
        }
      }

      if (state.obsidianBot) {
        // buy geode
        const oreMissing = blueprint.geode[0] - state.ore;
        const obsidianMissing = blueprint.geode[1] - state.obsidian;

        const geodeTime = Math.max(
          Math.ceil(obsidianMissing / state.obsidianBot),
          Math.ceil(oreMissing / state.oreBot)
        );
        if (events.length + geodeTime <= 30) {
          add = true;
          newToExplore.add(events + "".padEnd(geodeTime, "W") + "G");
        }
      }
      if (!add) {
        newToExplore.add(events.padEnd(32, "W"));
      }
    }
    toExplore = newToExplore;
  }
  return maxGeode;
};

let total = 1;
for (let i = 0; i < blueprints.length; i++) {
  const blueprint = blueprints[i];
  console.log(i);
  const max = getMaxOutputForBluePrint(blueprint);
  total *= max;
}
console.log(total);

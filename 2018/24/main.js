const [rawImmune, rawInfection] = require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n\n")
  .map((group) => group.split("\n"));

const parseLine = (line, type, index) => {
  const matched = line.match(
    /(\d+) units each with (\d+) hit points( \(.+\))? with an attack that does (\d+) (\w+) damage at initiative (\d+)/
  );

  const rawImmunitites = matched[3];

  let immunities = {};
  if (rawImmunitites) {
    for (let immunity of rawImmunitites.slice(2, -1).split(";")) {
      const [_, immunityType, types] = immunity.match(/(\w+) to (.+)$/);
      immunities[immunityType] = types.split(", ");
    }
  }

  return {
    id: type + index,
    units: Number(matched[1]),
    hp: Number(matched[2]),
    elements: immunities,
    damage: Number(matched[4]),
    damageType: matched[5],
    initiative: Number(matched[6]),
    type,
  };
};

const immune = rawImmune.slice(1).map((line, index) => parseLine(line, "immune", index));
const infection = rawInfection
  .slice(1)
  .map((line, index) => parseLine(line, "infection", index));

const computeDmg = (attack, defense) => {
  const base = attack.damage * attack.units;
  if (defense.elements.immune && defense.elements.immune.includes(attack.damageType)) {
    return 0;
  }
  if (defense.elements.weak && defense.elements.weak.includes(attack.damageType)) {
    return base * 2;
  }
  return base;
};

const getEffectivePower = (group) => group.units * group.damage;

const runBattle = (rawAllGroups) => {
  let allGroups = JSON.parse(JSON.stringify(rawAllGroups));
  while (allGroups.some(({ type }) => type === 'infection') && allGroups.some(({ type }) => type === 'immune')) {
    allGroups.sort((groupB, groupA) => {
      if (getEffectivePower(groupB) !== getEffectivePower(groupA)) {
        return getEffectivePower(groupA) - getEffectivePower(groupB);
      }
      return groupA.initiative - groupB.initiative;
    });
    let targets = {};

    for (let attack of allGroups) {
      let maxDmg = 0;
      let bestId = null;
      for (let defense of allGroups.filter(({ type, id }) => type !== attack.type && !Object.values(targets).includes(id))) {
        const dmg = computeDmg(attack, defense);
        if (dmg > maxDmg) {
          maxDmg = dmg;
          bestId = defense.id;
        }
      }
      if (bestId) {
        targets[attack.id] = bestId;
      }
    }

    allGroups.sort((groupB, groupA) => {
      return groupA.initiative - groupB.initiative;
    });

    for (let i = 0; i < allGroups.length; i++) {
      const attack = allGroups[i];
      if (attack.units <= 0) {
        continue;
      }
      const defense = allGroups.find(({ id }) => id === targets[attack.id]);
      if (!defense) {
        continue;
      }
      const dmg = computeDmg(attack, defense);

      defense.units -= Math.floor(dmg / defense.hp)

    }
    allGroups = allGroups.filter(({ units }) => units > 0);
  }
  return allGroups;
};

let result = runBattle([...immune, ...infection]);
console.log(result.reduce((total, { units }) => total + units, 0));

let boost = 34;
while (true) {
  result = runBattle([...immune.map(immune => ({ ...immune, damage: immune.damage + boost})), ...infection]);
  if (result[0].type === "immune") {
    break;
  }
  boost+= 1;
}


console.log(result.reduce((total, { units }) => total + units, 0));

const costs = {
  magicMissile: 53,
  drain: 73,
  shield: 113,
  poison: 173,
  recharge: 229,
};

let leastMana = Infinity;


const runEffects = (state) => {
  const newEffects = {};
  const newState = {...state};
  Object.keys(state.effects).forEach(effect => {
    if (state.effects[effect] > 1) {
      newEffects[effect] = state.effects[effect] - 1;
    }
    switch(effect) {
      case "poison":
        newState.bossHp -= 3;
        break;
      case "recharge":
        newState.playerMana += 101;
        break;
    }
  });
  newState.effects = newEffects;
  return newState;
};

const runSpell = (state, spell) => {
  let newState = JSON.parse(JSON.stringify({...state, spells: [...state.spells, spell]}));
  newState.manaUsed += costs[spell];
  newState.playerMana -= costs[spell];
  switch(spell) {
    case "magicMissile":
      newState.bossHp -= 4;
      break;
    case "drain":
      newState.bossHp -= 2;
      newState.playerHp += 2;
      break;
    case "shield":
      newState.effects.shield = 6;
      break;
    case "poison":
      newState.effects.poison = 6;
      break;
    case "recharge":
      newState.effects.recharge = 5;
      break;
  }
  return newState;
}

const runSimulation = (state) => {
  const intState = {...state, playerHp: state.playerHp - 1};

  if (intState.playerHp <= 0) {
    return;
  }

  let newState = runEffects(intState);

  if (newState.bossHp <= 0) {
    leastMana = Math.min(newState.manaUsed, leastMana);
    return;
  }

  for (let [spell, cost] of Object.entries(costs)) {
    if (cost <= newState.playerMana && !newState.effects[spell]) {
      const newNewState = runEffects(runSpell(newState, spell));

      if (newNewState.spells.join('') === "rechargeshielddrainpoisonmagicMissile") {
      }
      if (newNewState.bossHp <= 0) {
        leastMana = Math.min(newNewState.manaUsed, leastMana);
        continue;
      }
      newNewState.playerHp -= newNewState.effects.shield ? newNewState.bossDamage - 7 : newNewState.bossDamage;
      if (newNewState.playerHp <= 0) {
        continue;
      }
      if (newNewState.manaUsed > leastMana) {
        continue;
      }
      runSimulation(newNewState);
    }
  }
};

runSimulation({
  spells: [],
  effects: {},
  playerHp: 50,
  playerMana: 500,
  playerArmor: 7,
  bossHp: 71,
  bossDamage: 10,
  manaUsed: 0,
}, true);

console.log(leastMana);

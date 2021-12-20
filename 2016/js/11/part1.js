"use strict";
const testing = false;

const floors = testing
  ? [["HM", "LM"], ["HG"], ["LG"], []]
  : [
      ["SG", "SM", "PG", "PM"],
      ["TG", "RG", "RM", "CG", "CM"],
      ["TM"],
      [],
    ];

const dp = {};
const stringifyState = (state, elevator) => {
  const copied = state.map(el => el.slice().sort());
  return JSON.stringify([copied, elevator]);
};

const explored = {};
const finalState = testing ? 
  stringifyState([
  [],
  [],
  [],
  ["HM", "LM", "HG", "LG"],
], 3) :

  stringifyState([
  [],
  [],
  [],
  ["SG", "SM", "PG", "PM", "TG", "RG", "RM", "CG", "CM", "TM"],
], 3);

dp[stringifyState(floors, 0)] = 0;

const isDead = (state) => {
  for (let i = 0; i < state.length; i++) {
    const floor = state[i];
    for (let item of floor) {
      if (item.endsWith("M")) {

        if (
          floor.some((element) => element.endsWith("G")) &&
          !floor.some((element) => element == item.replace("M", "G"))
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

let iter = 0;
while (!dp[finalState]) {
  iter++;
  for (let key of Object.keys(dp)) {
    if (explored[key]) {
      continue;
    } else {
      explored[key];
    }
    const [state, elevator] = JSON.parse(key);
    const itemsAtFloor = state[elevator];
    const raw_possible = new Set();
    for (let i of itemsAtFloor) {
      for (let j of itemsAtFloor) {
        if (i !== j) {
          let item = [i, j].sort();
          raw_possible.add(item.join("-"));
        } else {
          raw_possible.add(i);
        }
      }
    }
    const possibles = [...raw_possible].map(el => el.split("-"));

    const down = elevator - 1;
    if (down >= 0) {
      possibles.forEach(possible => {
        const newState = state.map((floor, floorIndex) => {
          if (floorIndex === elevator) {
            return floor.filter(el => !possible.includes(el));
          }
          if (floorIndex === down) {
            return [...floor, ...possible];
          }
          return floor;
        });
        if (!isDead(newState)) {
          const str = stringifyState(newState, down);

          if (dp[str] === undefined || dp[str] > dp[key] + 1) {
            dp[stringifyState(newState, down)] = dp[key] + 1;
          }
        }
      })

    }
    const up = elevator + 1;
    if (up < state.length) {
      possibles.forEach(possible => {
        const newState = state.map((floor, floorIndex) => {
          if (floorIndex === elevator) {
            return floor.filter(el => !possible.includes(el));
          }
          if (floorIndex === up) {
            return [...floor, ...possible];
          }
          return floor;
        });
        if (!isDead(newState)) {
          const str = stringifyState(newState, up);

          if (dp[str] === undefined || dp[str] > dp[key] + 1) {
            dp[stringifyState(newState, up)] = dp[key] + 1;
          }
        } else {

        }
      })
    }
  }
  console.log(iter);
}

console.log(dp[finalState]);

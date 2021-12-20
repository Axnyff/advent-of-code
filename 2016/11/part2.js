"use strict";
const testing = false;

const floors = testing
  ? [["HM", "LM"], ["HG"], ["LG"], []]
  : [
      ["EG", "EM", "DG", "DM", "SG", "SM", "PG", "PM"],
      ["TG", "RG", "RM", "CG", "CM"],
      ["TM"],
      [],
    ];

const stringifyState = (state, elevator) => {
  const copied = state.map(el => el.slice().sort());
  return JSON.stringify([copied, elevator]);
};

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
  ["EG", "EM", "DG", "DM", "SG", "SM", "PG", "PM", "TG", "RG", "RM", "CG", "CM", "TM"],
], 3);

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
let explored = new Set();
let toexplore = new Set();
toexplore.add(stringifyState(floors, 0));
explored.add(stringifyState(floors, 0));
let done = false;
while (!done) {
  iter++;
  let newtoexplore = new Set();
  for (let key of toexplore) {
    explored.add(key);
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

          if (str === finalState) {
            done = true;
          }
          if (!explored.has(str)) {
            newtoexplore.add(str);
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
          if (str === finalState) {
            done = true;
          }
          if (!explored.has(str)) {
            newtoexplore.add(str);
          }
        }
      })
    }
  }
  toexplore = newtoexplore;
}

console.log(iter);

"use strict";
const testing = true;

const floors = testing
  ? [["HM", "LM"], ["HG"], ["LG"], []]
  : [
      ["SG", "SM", "PG", "PM"].sort(),
      ["TG", "RG", "RM", "CG", "CM"].sort(),
      ["TM"],
      [],
    ];

const isSolved = (state) => {
  for (let i = 0; i < state.length - 1; i++) {
    if (state[i].length !== 0) {
      return false;
    }
  }
  return true;
};

const isDead = (state) => {
  for (let i = 0; i < state.length; i++) {
    const floor = state[i];
    for (let item of floor) {
      if (item.endsWith("M")) {
        if (
          floor.some((element) => element.endsWith("M")) &&
          floor.some((element) => element.endsWith("G")) &&
          !floor.some((element) => element == item.replace("M", "G"))
        ) {
          return true;
        }
      }
    }
    if (state[i].length !== 0) {
      return false;
    }
  }
  return false;
};
let elevator = 0;

const solutions = {};
const seen = {};

const printState = (state, elevator, context = "") => {
  let real_res = "";
  for (let i = state.length - 1; i >= 0; i--) {
    const floor = state[i];
    let res = "F" + (i + 1);
    if (i === elevator) {
      res += " E";
    } else {
      res += " .";
    }
    for (let item of floor) {
      res += " " + item + " ";
    }
    real_res = real_res + res + "\n";
  }
  console.log(context + ": " + "\n" + real_res);
};
const termination = 5;

const solve = (state, elevator = 0, steps = 0) => {
  if (steps > 11) {
    return Infinity;
  }
  // REMOVE
  printState(state, elevator, "STEP " + steps);
  if (steps === 2 && state[2].join("") !== "HGHMLG") {
    return Infinity;
  }
  if (
    steps === 3 &&
    state[2].join("") !== "HGLG" &&
    state[1].join("") !== "HM"
  ) {
    return Infinity;
  }
  seen[JSON.stringify(state)] = true;
  if (solutions[JSON.stringify(state)]) {
  }
  if (isSolved(state)) {
    console.log("WEH");
    printState(state, elevator, "SOLVED");
    solutions[JSON.stringify(state)] = steps;
    return steps;
  }
  if (isDead(state)) {
    return Infinity;
  }
  const possibles = [];
  const floor = state[elevator];

  for (let i of floor) {
    for (let j of floor) {
      if (i === j) {
        possibles.push([i]);
      } else {
        possibles.push([i, j]);
      }
    }
  }
  const potentials = [];
  for (let i of [1, -1]) {
    const newElevator = elevator + i;
    if (state[newElevator] === undefined) {
      continue;
    }
    for (let possible of possibles) {
      const newState = state.map((floor, index) => {
        if (index === elevator) {
          return floor.filter((el) => !possible.includes(el));
        }
        if (index === newElevator) {
          const newFloor = [...floor, ...possible];
          newFloor.sort();
          return newFloor;
        }
        return floor;
      });
      if (!seen[JSON.stringify(newState)]) {
        potentials.push(solve(newState, newElevator, steps + 1));
      }
    }
  }
  return Math.min(...potentials);
};

// console.log(isDead([
//   ["LM"],
//   [],
//   ["HG", "HM", "LG"],
//   [],
// ]))

console.log(solve(floors));

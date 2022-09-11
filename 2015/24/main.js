const fs = require('fs');

const input = fs.readFileSync('input').toString().split('\n').slice(0, -1).map(Number);

// const input = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
console.log(input);

const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const product = (arr) => arr.reduce((a, b) => a * b, 1);

const total = sum(input);
const target = total / 4;
console.log(target);

const getPossibleGroups = (current = []) => {
  const actual = sum(current);
  if (actual === target) {
    return [current];
  }
  const possibles = [];
  const index = current.length && input.indexOf(current[current.length - 1]);
  for (let i of input.slice(index)) {
    if (i + actual <= target && !current.includes(i)) {
      possibles.push(...getPossibleGroups([...current, i]));
    }
  }
  return possibles;
};

const groups = getPossibleGroups();

const first = groups.sort((groupA, groupB) => {
  if (groupA.length !== groupB.length) {
    return groupA.length - groupB.length;
  }
  return product(groupA) - product(groupB);

})[0];

console.log(product(first));

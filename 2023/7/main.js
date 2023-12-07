const scoreHand = (hand) => {
  const groups = {};
  for (let i of hand) {
    groups[i] = groups[i] ? groups[i] + 1 : 1;
  }
  const array = Object.entries(groups).sort((a, b) => b[1] - a[1]);
  if (array[0][1] === 5) {
    return 1;
  }
  if (array[0][1] === 4) {
    return 2;
  }
  if (array[0][1] === 3 && array[1][1] === 2) {
    return 3;
  }
  if (array[0][1] === 3) {
    return 5;
  }
  if (array[0][1] === 2 && array[1][1] === 2) {
    return 6;
  }
  if (array[0][1] === 2) {
    return 7;
  }
  return 8;
};
const saw = {

};

const scoreHand2 = (hand, noRec) => {
  const groups = {};
  for (let i of hand) {
    groups[i] = groups[i] ? groups[i] + 1 : 1;
  }
  const array = Object.entries(groups).sort((a, b) => {
    const diff = b[1] - a[1]
    if (diff !== 0) {
      return diff;
    }
    return order2.indexOf(a[0]) - order2.indexOf(b[0]);
  });
  const jokers = array.find(([a]) => a === "J")?.[1] || 0;

  if (!jokers) {
    return scoreHand(hand);
  }

  if (jokers >= 4) {
    return 1;
  }
  if (jokers === 3) {
    return array[1][1] === 2 ? 1 : 2;
  }
  if (jokers === 2) {
    if (jokers && !noRec && !saw[hand]) {
      saw[hand] = true;
    }
    if (array[0][0] !== "J") {
      return array[0][1] + jokers === 5 ? 1 : 2;
    }
    return 5;
  }


  if (array[0][1] + jokers === 5) {
    return 1;
  }
  if (array[0][1] + jokers === 4) {
    return 2;
  }
  if (array[0][1] + jokers  === 3 && array[1][1] === 2) {
    return 3;
  }
  if (array[0][1] + jokers === 3) {
    return 5;
  }
  if (array[0][1] === 2 && array[1][1] + jokers === 2) {
    return 6;
  }
  if (array[0][1] + jokers === 2) {
    return 7;
  }
  return 8;
};

const order = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const order2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const handBiggerThan = (handA, handB) => {
  const scoreA = scoreHand(handA[0]);
  const scoreB = scoreHand(handB[0]);
  if (scoreA !== scoreB) {
    return scoreA < scoreB;
  }
  for (let i = 0; i < handA[0].length; i++) {
    const orderA = order.indexOf(handA[0][i])
    const orderB = order.indexOf(handB[0][i]);
    if (orderA !== orderB) {
      return orderA < orderB;
    }
  }
  throw new Error("oh no");
};

const handBiggerThan2 = (handA, handB) => {
  const scoreA = scoreHand2(handA[0]);
  const scoreB = scoreHand2(handB[0]);

  if (scoreA !== scoreB) {
    return scoreA < scoreB;
  }
  for (let i = 0; i < handA[0].length; i++) {
    const orderA = order2.indexOf(handA[0][i])
    const orderB = order2.indexOf(handB[0][i]);
    if (orderA !== orderB) {
      return orderA < orderB;
    }
  }
  throw new Error("oh no");
};

const handsData = require("fs")
  .readFileSync(process.argv[2])
  .toString()
  .slice(0, -1)
  .split("\n")
  .map((l) => {
    const [a, b] = l.split(" ");
    return [a, Number(b)];
  });

const hands = handsData.sort((a, b) => handBiggerThan(a, b) ? 1 : -1);

const score = hands.reduce((score, hand, index) => score + hand[1] * (index + 1), 0);

console.log(score);

const hands2 = handsData.sort((a, b) => handBiggerThan2(a, b) ? 1 : -1);
const score2 = hands2.reduce((score, hand, index) => score + hand[1] * (index + 1), 0);
console.log(score2);

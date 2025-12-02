let position = 50;
let total = 0;
for (let instruction of require("fs")
  .readFileSync("input")
  .toString()
  .slice(0, -1)
  .split("\n")) {
  const dir = instruction[0];
  let amount = Number(instruction.slice(1));
  while (amount > 100) {
    amount -= 100;
  }

  if (position === 0) {
    total += 1;
  }
  if (dir === "L") {
    if (amount > position) {
      position = 100 + position - amount;
    } else {

      position = position - amount;
    }
  } else {
    position = (position + amount) % 100;
  }
}
console.log(total);

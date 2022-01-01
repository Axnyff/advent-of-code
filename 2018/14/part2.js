let input = 890691;

const recipes = [3, 7];
let elf1 = 0;
let elf2 = 1;

for (let i = 0; i < input * 50; i++) {
  const total = recipes[elf1] + recipes[elf2];
  const newItems = total.toString().split("").map(Number);
  recipes.push(...newItems);
  elf1 = (elf1 + 1 + recipes[elf1]) % recipes.length;
  elf2 = (elf2 + 1 + recipes[elf2]) % recipes.length;
}
const index = recipes.join("").indexOf(input.toString());
console.log(index);

import { printResult } from "..";
import fs from "fs";

type Recipe = {
  products: [number, string][];
  result: [number, string];
};

type RecipeByResult = { [K: string]: Recipe };

const part1 = (recipes: RecipeByResult): number => {
  let produced: { [K: string]: number } = {};
  let needed: { [K: string]: number } = { FUEL: 1 };

  while (true) {
    const keys = Object.keys(needed);
    for (let key of keys) {
      if (key === "ORE") {
        continue;
      }
      const val = needed[key];
      delete needed[key];
      const recipe = recipes[key];
      const recipeCount = recipe.result[0];
      const production = Math.ceil((val - (produced[key] || 0)) / recipeCount);
      produced[key] = (produced[key] ||0) + production * recipeCount - val;
      for (let prod of recipe.products) {
        needed[prod[1]] = (needed[prod[1]] || 0) + prod[0] * production;
      }
    }
    if (!Object.keys(needed).some(key => key !== "ORE")) {
      break;
    }
  }
  return needed.ORE;
};

const part2 = (recipes: RecipeByResult): number => {
  let produced: { [K: string]: number } = {};
  let increment = 1000;
  let needed: { [K: string]: number } = { FUEL: increment };

  let totalFuel = 0;
  while (true) {
    const keys = Object.keys(needed);
    for (let key of keys) {
      if (key === "ORE") {
        continue;
      }
      const val = needed[key];
      delete needed[key];
      const recipe = recipes[key];
      const recipeCount = recipe.result[0];
      const production = Math.ceil((val - (produced[key] || 0)) / recipeCount);
      produced[key] = (produced[key] ||0) + production * recipeCount - val;
      for (let prod of recipe.products) {
        needed[prod[1]] = (needed[prod[1]] || 0) + prod[0] * production;
      }
    }
    if (!Object.keys(needed).some(key => key !== "ORE")) {
      if (needed.ORE >= 1000000000000) {
        break;
      } else {
        totalFuel += increment;
        if (needed.ORE >= 950000000000) {
          increment = 1;
        }
        needed.FUEL = increment;
      }
    }
  }
  console.log(needed.ORE);
  return totalFuel;
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split("\n")
    .filter(el => el !== "")
    .map<Recipe>(el => {
      const [input, output] = el.split(" => ");
      const matchOutput = output.match(/(\d+) (\w+)/) as string[];
      const result: [number, string] = [
        parseInt(matchOutput[1], 10),
        matchOutput[2]
      ];

      const products: [number, string][] = input.split(", ").map(el => {
        const match = el.match(/(\d+) (\w+)/) as string[];
        const result: [number, string] = [parseInt(match[1], 10), match[2]];
        return result;
      });

      return {
        products,
        result
      };
    });

  const recipeByResult: RecipeByResult = data.reduce(
    (acc, recipe) => ({ ...acc, [recipe.result[1]]: recipe }),
    {}
  );
  printResult(part1(recipeByResult), part2(recipeByResult));
});

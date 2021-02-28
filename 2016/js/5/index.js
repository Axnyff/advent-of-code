const md5 = require("md5");

const input = "abbhdwsy";

const part1 = () => {
  let res = "";
  let index = 0;
  while (res.length < 8) {
    let hash = md5(input + index);
    if (hash.startsWith("00000")) {
      res += hash[5];
    }
    index++;
  }

  console.log(res);
};

const part2 = () => {
  let res = [];

  let index = 0;
  while (res.join("").length !== 8) {
    let hash = md5(input + index);
    if (
      hash.startsWith("00000") &&
      +hash[5] < 8 &&
      res[hash[5]] === undefined
    ) {
      res[hash[5]] = hash[6];
    }
    index++;
  }

  console.log(res.join(""));
};

// part1();
part2();

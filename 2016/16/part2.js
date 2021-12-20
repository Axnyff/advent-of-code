const step = (a) => {
  const b = a.split("").reverse().map(el => el === "1" ? 0: 1).join("");
  return a + "0" + b;
};


const checksum = (s) => {
  let res = "";
  for (let i = 0; i < s.length; i += 2) {
    const chars = s.slice(i, i + 2);
    if (["11", "00"].includes(chars)) {
      res = res + "1";
    } else {
      res = res + "0";
    }
  }
  if (res.length % 2 !== 0) {
    return res;
  }
  return checksum(res);
};

const solve = (input, length) => {
  let current = input;
  while (current.length <= length) {
    current = step(current);
  }

  current = current.slice(0, length);
  return checksum(current);
};


console.log(solve("10111100110001111", 35651584));

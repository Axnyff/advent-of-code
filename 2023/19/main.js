const cond = {};
const [raw_cond, raw_parts] = require("fs").readFileSync("input").toString().slice(0, -1).split("\n\n");

raw_cond.split("\n").forEach(c => {
  const [name, steps] = c.split("{");
  const parts = steps.slice(0, -1).split(",").map(item =>
    item.split(":")
  );
  cond[name] = parts;
});

const parts = raw_parts.split("\n").map(p => {
  const match = p.match(/x=(\d+),m=(\d+),a=(\d+),s=(\d+)/);

  return {
    x: Number(match[1]),
    m: Number(match[2]),
    a: Number(match[3]),
    s: Number(match[4]),
  }
});

let evalWorkflow = (part, workflow) => {
  const { x, m, a, s } = part;
  for (let item of cond[workflow]) {
    if (item.length === 2) {
      let cond = eval(item[0]);
      if (cond) {
        return item[1];
      }
    } else {
      return item[0];
    }
  }
};

let evalResult = (part) => {
  let workflow = "in";
  while (workflow !== "A" && workflow !== "R") {
    workflow = evalWorkflow(part, workflow);
  }
  return workflow;
};

let total = 0;
for (let part of parts) {
  if (evalResult(part) === "A") {
    total += part.x + part.m + part.a + part.s;
  }
}
console.log(total);

const intervals = {
  a: [],
  m: [],
  x: [],
  s: [],
}
for (let c of Object.values(cond)) {
  for (let item of c) {
    if (item.length === 2) {
      intervals[item[0][0]].push(item[0])
    }
  }
}

const processInterval = (raw_intervals) => {
  let intervals = [...new Set(raw_intervals)].map(i => {
    const sign = i[1];
    const bound = Number(i.slice(2))
    return [bound, sign];
  }).sort((a, b) => a[0] - b[0]);

  let result = [];
  let prev = 1;
  for (let [bound, sign] of intervals) {
    if (sign === ">") {
      result.push([prev, bound]);
      prev = bound + 1;
    } else {
      result.push([prev, bound -1]);
      prev = bound;
    }
  }
  result.push([prev, 4000]);

  let true_result = [];
  for (let i = 0; i < result.length - 1; i+=2 ) {
    true_result.push(result[i], result[i + 1]);
  }
  if (true_result[true_result.length -1][1] !== 4000) {
    true_result.push([true_result[true_result.length -1][1] + 1, 4000]);
  }

  return true_result;
};

let current = [["in"]];
let res = [];
while (current.length) {
  let newCurrent = [];
  for (let item of current) {
    let key = item.at(-1);
    let conditions = [];
    for (let i = 0; i < cond[key].length; i++) {
      let condition = cond[key][i][0];
      let dir = cond[key][i][1];
      if (dir === undefined) {
        dir = condition;
        if (dir === "A") {
          res.push([...item.slice(0, -1), ...conditions]);
        } else if (dir !== "R") {
          newCurrent.push([...item.slice(0, -1), ...conditions, dir]);
        }
      } else {
        if (dir === "A") {
          res.push([...item.slice(0, -1), ...conditions, condition]);
        } else if (dir !== "R") {
          newCurrent.push([...item.slice(0, -1), ...conditions, condition, dir]);
        }
        conditions.push("not " + condition);
      }
    }
  }
  current = newCurrent;
}

let total2 = 0;


for (let item of res) {
  let start = {
    x: [1, 4000],
    s: [1, 4000],
    a: [1, 4000],
    m: [1, 4000],
  };

  for (let part of item) {
    let isNot = part.startsWith("not");
    let target = isNot ? part[4] : part[0];
    let sign = isNot ? part[5] : part[1];
    let bound = Number(isNot ? part.slice(6) : part.slice(2));

    if (sign === "<" && !isNot) {
      start[target][1] = Math.min(bound - 1, start[target][1]);
    }
    if (sign === ">" && isNot) {
      start[target][1] = Math.min(bound, start[target][1]);
    }
    if (sign === ">" && !isNot) {
      start[target][0] = Math.max(bound + 1, start[target][0]);
    }
    if (sign === "<" && isNot) {
      start[target][0] = Math.max(bound, start[target][0]);
    }
  }
  total2 += (start.x[1] - start.x[0] + 1) * (start.s[1] - start.s[0] + 1) * (start.a[1] - start.a[0] + 1) * (start.m[1] - start.m[0] + 1);
}


console.log(total2);

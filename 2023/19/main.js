const cond = {};
const [raw_cond, raw_parts] = require("fs").readFileSync("test-input").toString().slice(0, -1).split("\n\n");

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

const processInterval = (interval) => {
  console.log("process");
  let result = [[1, 4000]];
  for (let a of interval) {
    console.log(a);
    let bound = Number(a.slice(2));
    let sign = a[1];
    result = result.flatMap(([start, end]) => {
      if (sign === "<" && start > bound) {
        return [[start, end]];
      }
      if (sign === ">" && end < bound) {
        return [[start, end]]
      }
      if (sign === ">") {
        return [[start, bound], [bound + 1, end]]
      }
      return [[start, bound - 1], [bound, end]];
    });
  }
  result = [...new Set(result.flat())].sort((a, b) => a - b);
  let intervals = [];
  for (let i = 0; i < result.length - 1; i++) {
    intervals.push([i === 0 ? result[i]: result[i] +1 , result[i + 1]]);
  }

  return intervals;
};
let as = processInterval(intervals.a);
let xs = processInterval(intervals.x);
let ms = processInterval(intervals.m);
let ss = processInterval(intervals.s);

// console.log(as.reduce((a, b) => a + b[1] - b[0] + 1, 0));
// console.log(xs.reduce((a, b) => a + b[1] - b[0] + 1, 0));
// console.log(ms.reduce((a, b) => a + b[1] - b[0] + 1, 0));
// console.log(ss.reduce((a, b) => a + b[1] - b[0] + 1, 0));

let total2 = 0;
console.log(as);
for (let a of as) {
  for (let x of xs) {
    for (let m of ms) {
      for (let s of ss ) {
        if (evalResult({a: a[0], x: x[0], m: m[0], s: s[0] }) === "A") {
          total2 += (a[1] - a[0] + 1) * (x[1] - x[0] + 1) * (m[1] - m[0] + 1) * (s[1] - s[0] + 1);
        }
      }
    }
  }
}
console.log(total2);

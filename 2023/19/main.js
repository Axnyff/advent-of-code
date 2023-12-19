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
    for (let sub of cond[key]) {
      // handle fucking not
      if (sub.at(-1) !== "A" && sub.at(-1) !== "R") {
        newCurrent.push([...item.slice(1), ...sub]);
      } else {
        if (sub.at(-1) === "A") {
          res.push([...item.slice(1), ...sub]);
        }
      }
    }
  }
  current = newCurrent;
}
console.log(res);
return;

let as = processInterval(intervals.a);
let xs = processInterval(intervals.x);
let ms = processInterval(intervals.m);
let ss = processInterval(intervals.s);

console.log(as.length);
let total2 = 0;
for (let a of as) {
  console.log(a, as.indexOf(a));
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
// do a list of all the possible conditions

console.log(total2, total2 === 167409079868000 ? "Correct": "Wrong");

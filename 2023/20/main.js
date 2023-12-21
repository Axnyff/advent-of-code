const lines = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");


const modules = lines.map(line => {
  if (line.startsWith("broadcaster")) {
    return {
      name: "broadcaster",
      type: "broadcaster",
      output: line.slice(15).split(", "),
    }
  }
  if (line.startsWith("%")) {
    let [a, b] = line.split(" -> ");
    return {
      type: 'flip',
      status: 'off',
      name: a.slice(1),
      output: b.split(", "),
    };
  }
  if (line.startsWith("&")) {
    let [a, b] = line.split(" -> ");
    return {
      type: 'conj',
      name: a.slice(1),
      output: b.split(", "),
    };
  }
  throw new Error("wat");
});

modules.forEach(mod => {
  if (mod.type === "conj") {
    mod.memory = modules.filter(m => m.output.includes(mod.name)).reduce((res, mod) => {
      res[mod.name] = "low"
      return res;
    }, {});
  }
});

const pressButton = () => {
  let signals = [["low", "broadcaster", "button"]]
  let lows = 0;
  let highs = 0;
  while (signals.length !== 0) {
    let newSignals = [];
    for (let [intensity, target, from] of signals) {
      if (intensity === "low") {
        lows++;
      } else {
        highs++;
      }
      let module = modules.find(m => m.name === target)
      if (!module) {
        continue;
      }
      if (module.type === "broadcaster") {
        newSignals.push(...module.output.map(name => [intensity, name, module.name]));
      }
      if (module.type === "conj") {
        module.memory[from] = intensity;
        let newIntensity = Object.values(module.memory).includes("low") ? "high" : "low";
        newSignals.push(...module.output.map(name => [newIntensity, name, module.name]))
      }
      if (module.type === "flip" && intensity === "low") {
        module.status = module.status === "off" ? "on" : "off";
        let newIntensity = module.status === "off" ? "low": "high";
        newSignals.push(...module.output.map(name => [newIntensity, name, module.name]));
      }
    }
    signals = newSignals;
  }
  return {
    lows,
    highs,
  }
};

let lows = 0;
let highs = 0;

for (let i = 0; i < 1000; i++) {
  let res = pressButton();
  lows += res.lows;
  highs += res.highs;
}
console.log(lows * highs);

let res = 1;
for (let item of modules.find(m => m.type === "broadcaster").output) {
  let b = ""
  let focus = modules.find(m => m.name === item).output;
  while (true) {
    if (focus.some(name => modules.find(m => m.name === name).type === "conj")) {
      b += "1"
    } else {
      b += "0";
    }
    let next = focus.find(name => modules.find(m => m.name === name).type === "flip");
    if (next) {
      focus = modules.find(m=> m.name === next).output;
    } else {
      break;
    }
  }
  res *= parseInt(b.split("").reverse().join(""), 2);
}
console.log(res);




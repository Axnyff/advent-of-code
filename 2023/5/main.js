const data = require("fs").readFileSync("input").toString().slice(0, -1).split("\n\n");

const seeds = data[0].split(": ")[1].split(" ").map(Number);

const transforms = data.slice(1).map(group => group.split("\n").slice(1).map(el => el.split(" ").map(Number)));

const transformSeed = (seed) => {
  const resultSeed = transforms.reduce((seed, transform) => {
    const mapping = transform.find(([_, source, range]) => seed - source >= 0 && seed - source < range);
    return mapping ? seed + mapping[0] - mapping[1] : seed;
  }, seed);
  return resultSeed;
};
const result = seeds.map(transformSeed);
console.log(Math.min(...result));

let intervals = []
for (let i = 0; i < seeds.length; i+=2) {
  intervals.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
}

const traduceInterval = (interval, mapping) => {
  const mappingInterval = [mapping[1], mapping[1] + mapping[2] - 1];

  if (interval[0] > mappingInterval[1]) {
    return {
      remaining: [interval],
    };
  }
  if (interval[1] < mappingInterval[0]) {
    return {
      remaining: [interval],
    };
  }
  const diff = mapping[0] - mapping[1];

  if (interval[0] >= mappingInterval[0] && interval[1] <= mappingInterval[1]) {
    return {
      transform: [interval[0] + diff, interval[1] + diff],
      remaining: [],
    };
  }

  if (interval[0] >= mappingInterval[0] && interval[1] > mappingInterval[1]) {
    return {
      transform: [interval[0] + diff, mappingInterval[1] + diff],
      remaining: [[mappingInterval[1] + 1, interval[1]]],
    };
  }
  if (interval[1] <= mappingInterval[1]) {
    return {
      transform: [mappingInterval[0] + diff, interval[1] + diff],
      remaining: [
        [interval[0], mappingInterval[0] - 1]
      ]
    };
  }
  return {
    transform: [mappingInterval[0] + diff, mappingInterval[1] + diff],
    remaining: [
      [interval[0], mappingInterval[0] - 1],
      [mappingInterval[1] + 1, interval[1]]
    ]
  };
};

for (let mappings of transforms) {
  let remaining = intervals;
  let transform = [];

  for (let mapping of mappings) {
    let newRemaining = [];
    for (let interval of remaining) {
      const result = traduceInterval(interval, mapping);
      newRemaining.push(...result.remaining);
      if (result.transform) {
        transform.push(result.transform);
      }
    }
    remaining = newRemaining;
  }
  transform.push(...remaining);
  intervals = transform;
  intervals.sort((a, b) => a[0] - b[0]);
}

let min = Infinity;
for (let interval of intervals) {
  if (interval[0] < min) {
    min = interval[0];
  }
}
console.log(min);

const data = require("fs").readFileSync("input").toString().slice(0, -1).split("\n");

const getLine = (line) => {
  const [_, rest] = line.split(":");
  const times = rest.trim().split(/\s+/).map(Number);
  return times;
};

const races = getLine(data[0]).map((time, i) => ({
  time,
  record: getLine(data[1])[i],
}))


const result = races.map(race => {
  const better = Array.from({ length: race.time + 1 }, (_, i) =>
    (race.time - i) * i
  ).filter(dis => dis > race.record);
  return better.length;
}).reduce((a, b) => a * b);

console.log(result);

const time2 = Number(data[0].replace(/\D/g, ""))
const record2 = Number(data[1].replace(/\D/g, ""));

const start = Math.ceil(time2 / 2 - Math.sqrt(time2 ** 2/4 - record2));
const end = Math.floor(time2 / 2 + Math.sqrt(time2 ** 2/4 - record2));

const calcWinning = (time) => {
  return (time2 - time) * time - record2;
};

console.log(end - start + 1);

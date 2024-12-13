// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

// A94 + B22 = 8400
// A34 + B67 = 5400

// B22 - B94 * 67 / 34 = 8400 - 5400 * 94 / 34

// B = (8400 - 5400 * 94 / 34) / (22 - 94 * 67 / 34)
// A = (8400 - 22 * B) / 94
//
const systems = require("fs")
  .readFileSync("input")
  .toString()
  .trim()
  .split("\n\n")
  .map((system) => {
    const [aStr, bStr, c] = system.split("\n");

    const matchA = aStr.match(/X\+(\d+), Y\+(\d+)/);
    const xA = Number(matchA[1]);
    const yA = Number(matchA[2]);

    const matchB = bStr.match(/X\+(\d+), Y\+(\d+)/);
    const xB = Number(matchB[1]);
    const yB = Number(matchB[2]);

    const matchC = c.match(/X=(\d+), Y=(\d+)/);
    const xC = Number(matchC[1]);
    const yC = Number(matchC[2]);
    const b = (xC - (yC * xA) / yA) / (xB - (xA * yB) / yA);
    const a = (xC - xB * b) / xA;

    const base = {
      xA,
      yA,
      xB,
      yB,
      xC,
      yC,
    };
    if (Math.round(b * 100) / 100 !== Math.round(b) || Math.round(a * 100) / 100 !== Math.round(a)) {
      return base;
    }

    if (a !== Math.round(a) || b !== Math.round(b)) {
      console.log(a, b, Math.round(a), Math.round(b));
    }
    return {
      ...base,
      a: Math.round(a),
      b: Math.round(b),
    };
  });

console.log(systems.filter(s => s.a).map(s => s.a *3 + s.b).reduce((a, b) => a + b));

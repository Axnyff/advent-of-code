import { printResult } from "..";
import fs from "fs";

const readModes = (instruction: number, result: number[] = []): number[] => {
  if (instruction < 10) {
    return [...result, instruction];
  }
  const remainder = Math.floor(instruction / 10);
  return readModes(remainder, [...result, instruction % 10]);
};

const getVal = (
  target: number = 0,
  mode: number = 0,
  instructions: number[],
  relativeBase: number
) => {
  if (mode === 1) {
    return target;
  } else if (mode === 0) {
    return instructions[target] || 0;
  }
  return instructions[target + relativeBase] || 0;
};

const getAddress = (
  target: number = 0,
  mode: number = 0,
  instructions: number[],
  relativeBase: number
) => {
  if (mode === 0) {
    return target;
  }
  return target + relativeBase;
};

function* readInstructions(instructions: number[]) {
  let position = 0;
  let input = 0;
  let relativeBase = 0;
  outer: while (true) {
    const instruction = instructions[position];
    const instructionCode = instruction % 100;
    const modes = readModes(Math.floor(instruction / 100));
    let first = getVal(
      instructions[position + 1],
      modes[0],
      instructions,
      relativeBase
    );
    let second = getVal(
      instructions[position + 2],
      modes[1],
      instructions,
      relativeBase
    );
    const third = getAddress(
      instructions[position + 3],
      modes[2],
      instructions,
      relativeBase
    );
    switch (instructionCode) {
      case 1:
        instructions[third] = first + second;
        position += 4;
        break;
      case 2:
        instructions[third] = first * second;
        position += 4;
        break;
      case 3:
        input = yield undefined;
        first = getAddress(
          instructions[position + 1],
          modes[0],
          instructions,
          relativeBase
        );
        instructions[first] = input;
        position += 2;
        break;
      case 4:
        yield first;
        position += 2;
        break;
      case 5:
        if (first !== 0) {
          position = second;
        } else {
          position += 3;
        }
        break;
      case 6:
        if (first === 0) {
          position = second;
        } else {
          position += 3;
        }
        break;
      case 7:
        if (first < second) {
          instructions[third] = 1;
        } else {
          instructions[third] = 0;
        }
        position += 4;
        break;
      case 8:
        if (first === second) {
          instructions[third] = 1;
        } else {
          instructions[third] = 0;
        }
        position += 4;
        break;
      case 9:
        relativeBase += first;
        position += 2;
        break;
      case 99:
        break outer;
    }
  }
}

const dirs: { [K: number]: string } = {
  1: "^",
  2: "v",
  3: "<",
  4: ">"
};

class Minimap {
  currentPosition: number[];
  map: Map<string, number>;
  visited: Set<string>;
  direction: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  target: number[];
  constructor() {
    this.currentPosition = [0, 0];
    this.target = [0, 0];
    this.map = new Map();
    this.visited = new Set();
    this.direction = 1;
    this.savePosition(this.currentPosition, 0);
    this.minX = -5;
    this.minY = -5;
    this.maxX = 5;
    this.maxY = 5;
  }

  serializePosition = (position: number[]) => {
    return `${position[0]},${position[1]}`;
  };

  savePosition = (position: number[], count: number) => {
    const key = this.serializePosition(position);
    const existing = this.map.get(key) || 0;
    this.map.set(this.serializePosition(position), count + existing);
  };

  advance = (): number[] => {
    let result;
    if (this.direction === 1) {
      result = [this.currentPosition[0], this.currentPosition[1] - 1];
    } else if (this.direction === 2) {
      result = [this.currentPosition[0], this.currentPosition[1] + 1];
    } else if (this.direction === 3) {
      result = [this.currentPosition[0] - 1, this.currentPosition[1]];
    } else {
      result = [this.currentPosition[0] + 1, this.currentPosition[1]];
    }
    if (result[0] < this.minX) {
      this.minX = result[0];
    }
    if (result[0] > this.maxX) {
      this.maxX = result[0];
    }
    if (result[1] < this.minY) {
      this.minY = result[1];
    }
    if (result[1] > this.maxY) {
      this.maxY = result[1];
    }

    return result;
  };

  addValue = (value: number, i: number) => {
    if (value === 1) {
      this.currentPosition = this.advance();
      this.savePosition(this.currentPosition, 1);
    }
    if (value === 0) {
      this.savePosition(this.advance(), Infinity);
    }
    if (value === 2) {
      this.currentPosition = this.advance();
      this.savePosition(this.currentPosition, 1);
      this.target = this.currentPosition;
    }
    this.changeDirection();
  };

  changeDirection = () => {
    const initialInput = this.direction;
    let i = 0;
    for (let i = 0; i < 4; i++) {
      let mapValue = this.map.get(this.serializePosition(this.advance()));
      if (mapValue === undefined) {
        return;
      }
      this.direction = (this.direction % 4) + 1;
    }
    let minDir = 0;
    let minVal = Infinity;
    for (let i = 0; i < 4; i++) {
      let mapValue = this.map.get(this.serializePosition(this.advance())) || 0;
      if (mapValue < minVal) {
        minDir = i;
        minVal = mapValue;
      }
      this.direction = (this.direction % 4) + 1;
    }

    for (let i = 0; i < minDir; i++) {
      this.direction = (this.direction % 4) + 1;
    }
  };

  drawMap = () => {
    console.clear();
    for (let j = this.minY; j <= this.maxY; j++) {
      let line: string[] = [];
      for (let i = this.minX; i <= this.maxX; i++) {
        const exists = this.map.get(this.serializePosition([i, j]));
        let toDraw = " ";
        if (exists === Infinity) {
          toDraw = "#";
        } else if (exists !== undefined) {
          toDraw = ".";
        }
        if (
          this.serializePosition(this.currentPosition) ===
          this.serializePosition([i, j])
        ) {
          toDraw = "D";
        }
        if (
          this.serializePosition(this.target) === this.serializePosition([i, j])
        ) {
          toDraw = "T";
        }
        if (this.serializePosition([0, 0]) === this.serializePosition([i, j])) {
          toDraw = "O";
        }
        toDraw = toDraw || " ";
        line.push(toDraw);
      }
      console.log(line.join(""));
    }
    console.log("\n\n");
  };

  solve = (): number => {
    type Node = {
      position: number[];
      distance: number;
    };
    const queue: Node[] = [];
    queue.push({
      position: [0, 0],
      distance: 0
    });

    this.visited.add("0,0");
    while (queue.length !== 0) {
      const node = queue.pop() as Node;
      this.currentPosition = node.position;
      if (
        this.serializePosition(node.position) ===
        this.serializePosition(this.target)
      ) {
        return node.distance;
      }
      for (let i = 0; i < 4; i++) {
        this.direction = i + 1;
        const position = this.advance();
        const key = this.serializePosition(position);
        if (!this.visited.has(key) && this.map.get(key) !== Infinity) {
          queue.push({
            position,
            distance: node.distance + 1
          });
          this.visited.add(key);
        }
      }
    }
    return -1;
  };
  solvePart2 = (): number => {
    type Node = {
      distance: number;
      position: number[];
    };
    const queue: Node[] = [];
    queue.push({
      distance: 0,
      position: this.target,
    });

    this.visited = new Set();
    this.visited.add(this.serializePosition(this.target));
    let maxDistance = 0;
    while (queue.length !== 0) {
      const node = queue.pop() as Node;
      this.currentPosition = node.position;
      if (maxDistance < node.distance) {
        maxDistance = node.distance;
      }
      for (let i = 0; i < 4; i++) {
        this.direction = i + 1;
        const position = this.advance();
        const key = this.serializePosition(position);
        if (!this.visited.has(key) && this.map.get(key) !== Infinity) {
          queue.push({
            position,
            distance: node.distance + 1
          });
          this.visited.add(key);
        }
      }
    }
    return maxDistance
  };
}

const wait = (ms: number) =>
  new Promise(res => {
    setTimeout(res, ms);
  });

const solve = (data: number[]): [number, number] => {
  const gen = readInstructions(data.slice());
  let output;

  const map = new Minimap();
  let i = 0;
  while (i <= 6000) {
    i++;
    const { value, done } = gen.next(map.direction);
    if (done) {
      break;
    }
    if (value !== undefined) {
      map.addValue(value, i);
      output = value;
    }
  }
  return [map.solve(), map.solvePart2()];
};

fs.readFile(`${__dirname}/input`, (err: Error | null, rawData: Buffer) => {
  const data = rawData
    .toString()
    .split(",")
    .filter(el => el !== "")
    .map(el => parseInt(el, 10));

  printResult(...solve(data));
});

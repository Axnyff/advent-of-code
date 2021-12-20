const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => {
        readline.question(query, resolve);
    })
}

const instructions = require('fs').readFileSync('input').toString().trim().split('\n');

const width = 50;
const height = 6;

const grid = Array.from({ length: height}, () => '.'.repeat(width));


const printGrid = () => {
  for (let i = 0; i < height; i++) {
    let s = "";
    for (let j= 0; j < width; j++) {
      s += grid[i][j];
    }
    console.log(s);
  }
};

const compute = async() => {
  for (let instruction of instructions) {
    if (instruction.startsWith("rect")) {
      const match = instruction.match(/(\d+)x(\d+)/);
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      for (let i = 0; i < y; i++) {
        grid[i] = "#".repeat(x) + grid[i].slice(x);
      }
    }
    if (instruction.startsWith("rotate column")) {
      const match = instruction.match(/(\d+) by (\d+)/);
      const column = parseInt(match[1]);
      const amount = parseInt(match[2]);

      const columns = grid.map(el => el[column]);
      for (let i = 0; i < height; i++) {
        let row = grid[i];
        let new_row = row.slice(0, column) + columns[(i - amount + height) % height] + row.slice(column + 1);
        grid[i] = new_row;
      }
    }
    if (instruction.startsWith("rotate row")) {
      const match = instruction.match(/(\d+) by (\d+)/);
      const row = parseInt(match[1]);
      const amount = parseInt(match[2]);
      const remaining = grid[row].slice(width - amount);
      grid[row] = remaining + grid[row].slice(0, grid[row].length - amount);
    }
    printGrid();
    console.log("\n\n\n");
  }
}

const countPixels = () => {
  let total = 0;
  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      if (grid[i][j] === "#") {
        total++;
      }
    }
  }
  console.log(total);


};

compute().then(countPixels);;

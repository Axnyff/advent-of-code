const fs = require('fs');

const data = fs.readFileSync('input').toString();
const lines = data.split('\n').slice(0, -1);

// PRETTY EVIL
const content = lines.map(line => eval(line));

const walk_dir = (input, dirs) => {
  let position = input;
  for (const dir of dirs) {
    position = position[dir];
  }
  return position;
}

const do_explosion = (input, dirs = []) => {
  const position = walk_dir(input, dirs);

  if (!position) {
    return false;
  }
  if (typeof position === 'number') {
    return false;
  } else if (dirs.length === 4) {
    const [left, right] = position;

    const parent_dir = dirs.pop();
    const left_parent = parent_dir === 0;
    const parent = walk_dir(input, dirs);
    parent[parent_dir] = 0;

    if (left_parent) {
      let left_pos = walk_dir(input, [...dirs]);
      if (typeof left_pos[1] === 'number') {
        left_pos[1] = left_pos[1] + right;
      } else {
        left_pos = walk_dir(input, [...dirs, 1]);
        while(typeof left_pos[0] !== 'number') {
          left_pos = left_pos[0];
        }
        left_pos[0] = right + left_pos[0];
      }
      while (dirs.length) {
        let item = dirs.pop();
        const to_replace = walk_dir(input, dirs);
        if (item === 1) {
          let to_replace = walk_dir(input, dirs);
          if (typeof to_replace[0] !== 'number') {
            to_replace = to_replace[0];
            while (typeof to_replace[1] !== 'number') {
              to_replace = to_replace[1];
            }
            to_replace[1] = to_replace[1] + left
          } else {
            to_replace[0] = to_replace[0] + left;
          }
          break;
        }
      }
      return true;
    } else {
      let right_pos = walk_dir(input, [...dirs]);
      if (typeof right_pos[0] === 'number') {
        right_pos[0] = right_pos[0] + left;
      } else {
        right_pos = walk_dir(input, [...dirs, 0]);
        while(typeof right_pos[1] !== 'number') {
          right_pos = right_pos[1];
        }
        right_pos[0] = left + right_pos[1];
      }
      while (dirs.length) {
        let item = dirs.pop();
        const to_replace = walk_dir(input, dirs);
        if (item === 0) {
          let to_replace = walk_dir(input, dirs);
          if (typeof to_replace[1] !== 'number') {
            to_replace = to_replace[1];
            while (typeof to_replace[0] !== 'number') {
              to_replace = to_replace[0];
            }
            to_replace[0] = to_replace[0] + right
          } else {
            to_replace[1] = to_replace[1] + right;
          }
          break;
        }
      }
      return true;
    }
  } else {
    if (do_explosion(input, [...dirs, 0])) {
      return true;
    }
    return do_explosion(input, [...dirs, 1]);
  }
};

const do_split = (input, dirs = []) => {
  const position = walk_dir(input, dirs);

  if (!position) {
    return false;
  }
  if (typeof position === 'number') {
    if (position >= 10) {
      const item = dirs.pop();
      const parent = walk_dir(input, dirs);
      const left = Math.floor(position / 2);
      const right = Math.ceil(position / 2);
      parent[item] = [left, right];
      return true;
    } else {
      return false;
    }
  }  else {
    if (do_split(input, [...dirs, 0])) {
      return true;
    }
    return do_split(input, [...dirs, 1]);
  }
};

const reduce = (input) => {
  while (do_explosion(input)) {
  }
  if (do_split(input)) {
    return reduce(input);
  }
  return input;

};

const add = (a, b) => {
  return [a, b];
};

const compute_magnitude =(l) => {
  if (typeof l === 'number') {
    return l;
  }
  return 3 * compute_magnitude(l[0]) + 2* compute_magnitude(l[1]);
};

let max = 0;
for (let i = 0; i < content.length; i++) {
  for (let j = i + 1; j < content.length; j++) {
    const item1 = JSON.parse(JSON.stringify(content[i]));
    const item2 = JSON.parse(JSON.stringify(content[j]));
    const result1 = compute_magnitude(reduce(add(JSON.parse(JSON.stringify(item1)), 
      JSON.parse(JSON.stringify(item2)))));
    const result2 = compute_magnitude(reduce(add(JSON.parse(JSON.stringify(item2)), 
      JSON.parse(JSON.stringify(item1)))));
    if (result1 > max) {
      max = result1;
    }
    if (result2 > max) {
      max = result2;
    }
  }
}
console.log(max);

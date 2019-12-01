use std::collections::HashMap;

fn closest_square(n: isize) -> (isize, isize) {
    let mut i : isize = 1;
    while i.pow(2) < n {
        i = i + 2;
    }
    (i, i.pow(2))
}

fn part_1(target: isize, size: isize, origin: isize) -> isize {
    let mut offset : isize = (size - 1) / 2;
    let mut i = size - 1;

    let mut j = origin;

    while j != target {
        j -= 1;
        i -= 1;
        offset -= 1;
        if i == 0 {
            offset = (size - 1) / 2;
            i = size - 1;
        }
    }
    offset.abs() + (size - 1) / 2

}

#[derive(Debug, PartialEq, PartialOrd, Eq, Hash)]
struct Point {
    x: isize,
    y: isize,
}

fn next_dir(dir: (isize, isize)) -> (isize, isize) {
    match dir {
        (1, 0) => (0, 1),
        (0, 1) => (-1, 0),
        (-1, 0) => (0, -1),
        (0, -1) => (1, 0),
        (_, _) => (1, 0),
    }
}

fn part_2(inp :isize) -> isize {
    let mut map : HashMap<Point, isize> = HashMap::new();
    let mut val = 1;
    let point = Point { x: 0, y: 0};
    map.insert(point, val);

    let mut dir = (0, 1);
    let mut x = 1;
    let mut y = 0;
    let mut size = 1;

    while val <= inp {
        map.insert(Point { x: x, y : y}, val);
        val = 0;
        x += dir.0;
        y += dir.1;

        if x.abs() == size && y.abs() == size {
            if dir == (1, 0) {
                size += 1;
            } else {
                dir = next_dir(dir);
            }
        }

        if x == size && y == -size + 1 {
            dir = next_dir(dir);
        }


        for i in -1..2 {
            for j in -1..2 {
                let new_val = *map.get(&Point {x: x + i, y : y + j}).unwrap_or(&0);
                val += new_val;
            }
        }
    }
    val
}

fn main() {
    let input : isize = 325489;
    let (size, origin)  = closest_square(input);

    let result1 = part_1(input, size, origin);
    let result2 = part_2(input);

    println!("{:?} {:?}", result1, result2);
}

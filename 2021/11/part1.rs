use std::fs;
use std::collections::HashMap;

fn main() {
    let filename = "input";

    let contents = fs::read_to_string(filename)
        .expect("Something went wrong reading the file");

    let lines: Vec<&str> = contents.lines().collect();

    let mut data: HashMap<(isize, isize), u32> = HashMap::new();

    for i in 0..10 {
        for j in 0..10 {
            data.insert((i as isize, j as isize), lines[i].chars().nth(j).unwrap().to_digit(10).unwrap());
        }
    }

    let mut flashes = 0;
    for _i in 0..100 {
        for i in 0..10 {
            for j in 0..10 {
                data.insert((i, j), data.get(&(i, j)).unwrap() + 1);
            }
        }
        let mut has_change = true;

        while has_change {
            has_change = false;
            for i in 0..10 {
                for j in 0..10 {
                    let i2 = (i as isize) - 1;
                    let i3 = i + 1;
                    let j2 = (j as isize) - 1;
                    let j3 = j + 1;
                    if *data.get(&(i, j)).unwrap() >= 10 {
                        flashes += 1;
                        has_change = true;
                        data.insert((i, j), 0);
                        match data.get(&((i2, j))) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i2, j), *num + 1);
                                }
                            }
                        };
                        match data.get(&(i3, j)) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i3, j), *num + 1);
                                }
                            }
                        };
                        match data.get(&((i, j2))) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i, j2), *num + 1);
                                }
                            }
                        };
                        match data.get(&((i2, j2))) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i2, j2), *num + 1);
                                }
                            }
                        };
                        match data.get(&(i3, j2)) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i3, j2), *num + 1);
                                }
                            }
                        };
                        match data.get(&((i, j3))) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i, j3), *num + 1);
                                }
                            }
                        };
                        match data.get(&((i2, j3))) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i2, j3), *num + 1);
                                }
                            }
                        };
                        match data.get(&(i3, j3)) {
                            None => {},
                            Some(num) => {
                                if *num != 0 {
                                    data.insert((i3, j3), *num + 1);
                                }
                            }
                        };
                    }
                }
            }
        }
    }
    println!("{}", flashes);
}

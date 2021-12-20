use std::io::prelude::*;
use std::fs::File;

fn calc_line(input: &str) -> usize {
    let splitted = input.split_whitespace();

    let mut min : usize = 0;
    let mut max : usize = 0;
    for num in splitted {
        let val = num.parse::<usize>().unwrap();
        if min == 0 || val < min {
            min = val;
        }

        if max == 0 || val > max {
            max = val;
        }

    }


    max - min
}

fn new_calc_line(input: &str) -> usize {
    let splitted = input.split_whitespace();

    for (i, num_a) in splitted.enumerate() {
        let a = num_a.parse::<usize>().unwrap();
        for num_b in input.split_whitespace().skip(i + 1) {
            let b = num_b.parse::<usize>().unwrap();
            if a % b == 0 {
                return a / b;
            }
            if b % a == 0 {
                return b / a;
            }

        }

    }
    panic!("ooo no {}", input);
    return 0;

}

fn calc_checksum(input: String) -> usize {
    let lines = input.lines();
    let mut total : usize = 0;
    for line in lines {
        total = total + new_calc_line(line);
    }
    total
}

fn main() {
    let mut f = File::open("input").expect("no file");
    let mut contents = String::new();

    f.read_to_string(&mut contents)
        .expect("error reading file");
    println!("{:?}", calc_checksum(contents));
}

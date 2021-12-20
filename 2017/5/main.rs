use std::io::prelude::*;
use std::fs::File;

fn part_2(input: String) -> usize {
    let mut result : usize = 0;
    let mut list : Vec<isize> = input.lines()
        .map(|x| x.parse::<isize>().unwrap())
        .collect();
    let length = list.len();

    let mut index : usize = 0;

    while index < length {
        let value = list[index];
        if value >= 3 {
            list[index]  = list[index] - 1;
        } else {
            list[index]  = list[index] + 1;
        }

        index = if value < 0 {
            index - value.abs() as usize
        } else {
            index + value as usize
        };
        result += 1;
    }
    println!("{}", result);
    result
}

fn part_1(input: String) -> usize {
    let mut result : usize = 0;
    let mut list : Vec<isize> = input.lines()
        .map(|x| x.parse::<isize>().unwrap())
        .collect();
    let length = list.len();

    let mut index : usize = 0;

    while index < length {
        let value = list[index];
        list[index]  = list[index] + 1;

        index = if value < 0 {
            index - value.abs() as usize
        } else {
            index + value as usize
        };
        result += 1;
    }
    println!("{}", result);
    result
}


fn main() {
    let mut f = File::open("input").expect("no file");
    let mut contents = String::new();

    f.read_to_string(&mut contents)
        .expect("error reading file");
    part_2(contents);
}

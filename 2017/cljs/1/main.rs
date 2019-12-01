use std::fs::File;
use std::io::prelude::*;

fn eval_str(my_str: String) -> u32 {
    let mut total : u32 = 0;

    let len = my_str.len();
    let mut chars = my_str[0..len -1].chars();
    let mut last_char = chars.nth(len - 2).expect("OOO");

    for c in my_str[0..len - 1].chars() {
        if last_char == c {
            let num = c.to_digit(10).expect("OOOO");
            total += num;
        }
        last_char = c;
    }
    total
}


fn eval_str_bis(my_str: String) -> u32 {
    let mut total : u32 = 0;
    let other_str = &my_str[0.. my_str.len() - 1];
    let len = other_str.len();

    let mut chars = other_str.chars();
    let mut target_index = len / 2;
    let mut target_char = chars.nth(target_index).expect("first fail");

    for c in other_str.chars() {
        if target_char == c {
            let num = c.to_digit(10).expect("target fail");
            total += num;
        }
        target_index = (target_index + 1) % len;
        target_char = other_str.chars().nth(target_index).expect("last fail");
    }
    total
}

fn main() {
    let mut f = File::open("input").expect("file not found");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("something went wrong reading the file");

    println!("{}", eval_str(contents));
}

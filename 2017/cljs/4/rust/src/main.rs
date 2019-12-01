use std::io::prelude::*;
use std::fs::File;
use std::collections::HashSet;
use std::collections::LinkedList;
use std::iter::Iterator;
use std::iter::FromIterator;

fn is_valid_password(line: &str) -> bool {
    let set : HashSet<&str> = line.split_whitespace().collect();
    let list : LinkedList<&str> = line.split_whitespace().collect();

    return set.len() == list.len();
}

fn sort_by_char(word: &str) -> String {
    let mut chars: Vec<char> = word.chars().collect();
    chars.sort_by(|a, b| b.cmp(a));
    chars.push(' ');
    let s = String::from_iter(chars);
    s
}

fn is_valid_password_bis(line: &str) -> bool {
    let mut words : String = line.split_whitespace()
        .map(|x| sort_by_char(x)).collect();
    is_valid_password(&words)
}

fn part_1(input: String) {
    let lines = input.lines();
    println!("{:?}", lines.filter(|x| is_valid_password(x)).count());
}

fn part_2(input: String) {
    let lines = input.lines();
    println!("{:?}", lines.filter(|x| is_valid_password_bis(x)).count());
}

fn main() {
    let mut f = File::open("input").expect("no file");
    let mut contents = String::new();

    f.read_to_string(&mut contents)
        .expect("error reading file");
    part_2(contents);
}

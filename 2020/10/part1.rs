use std::fs;

fn main() {
    let contents = fs::read_to_string("input").expect("no such file");
    let mut numbers: Vec<i32> = contents.lines().map(|x| x.parse::<i32>().unwrap()).collect();
    numbers.sort();
    numbers.insert(0, 0);
    numbers.push(numbers.last().unwrap() + 3);

    let diffs: Vec<i32> = numbers.iter().enumerate().skip(1).map(|(i, x)| x - numbers[i - 1]).collect();

    let diffs_1 = diffs.iter().filter(|x| **x == 1).count();
    let diffs_3 = diffs.iter().filter(|x| **x == 3).count();

    println!("{}", diffs_1 * diffs_3);
}

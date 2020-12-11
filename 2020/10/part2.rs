use std::fs;
use std::collections::HashMap;

fn main() {
    let contents = fs::read_to_string("input").expect("no such file");
    let mut numbers: Vec<i64> = contents.lines().map(|x| x.parse::<i64>().unwrap()).collect();
    numbers.sort();
    let max = numbers.iter().max().unwrap();

    let mut dp: HashMap<i64, i64> = HashMap::new();
    dp.insert(0, 1);

    numbers.iter().for_each(|x| {
        let nb_of_ways = dp.get(&(*x -1)).map(|x| *x).unwrap_or(0) + dp.get(&(*x-2)).map(|x| *x).unwrap_or(0) + dp.get(&(*x-3)).map(|x| *x).unwrap_or(0);
        dp.insert(*x, nb_of_ways);
    });

    println!("{}", dp.get(&max).unwrap());

}

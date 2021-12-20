use std::collections::HashSet;

fn part_1(mut input: Vec<usize>) -> usize {
    let len = input.len();
    let mut result : usize = 0;
    let mut history : HashSet<String> = HashSet::new();
    let mut input_str : Vec<String> = input.iter()
        .map(|x| (*x).to_string()).collect();
    history.insert(input_str.join(","));
    loop {
        result += 1;
        let mut max_val : usize = 0;
        let mut index  : usize = 0;
        for (i, val) in input.iter().enumerate() {
            if *val > max_val {
                max_val = *val;
                index = i;
            }
        }

        input[index] = 0;
        index = (index + 1) % len;
        while max_val > 0 {
            input[index] = input[index] + 1;
            max_val -= 1;
            index = (index + 1) % len;
        }

        input_str = input.iter()
            .map(|x| (*x).to_string()).collect();

        if history.contains(&input_str.join(",")) {
            break;
        }
        history.insert(input_str.join(","));
    }
    result
}

fn part_2(mut input: Vec<usize>) -> usize {
    let len = input.len();
    let mut result : usize = 0;
    let mut history : Vec<String> = Vec::new();
    let mut input_str : Vec<String> = input.iter()
        .map(|x| (*x).to_string()).collect();
    history.push(input_str.join(","));
    loop {
        result += 1;
        let mut max_val : usize = 0;
        let mut index  : usize = 0;
        for (i, val) in input.iter().enumerate() {
            if *val > max_val {
                max_val = *val;
                index = i;
            }
        }

        input[index] = 0;
        index = (index + 1) % len;
        while max_val > 0 {
            input[index] = input[index] + 1;
            max_val -= 1;
            index = (index + 1) % len;
        }

        input_str = input.iter()
            .map(|x| (*x).to_string()).collect();

        if history.contains(&input_str.join(",")) {
            return result - history.iter().position(|x| *x == input_str.join(",")).unwrap();
        }
        history.push(input_str.join(","));
    }
    result
}

fn main() {
    let input : Vec<usize> = vec![4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5];
    println!("{}", input.contains(&4));
    println!("{}", part_2(input));

}

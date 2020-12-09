$ gcc main.c && ./a.out
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576

Beautiful! Who said C was hard? The secret is to only malloc and never free anything.
Also this takes a lot of time instead of just working right away.

$ gcc part2.c && ./a.out
-814143845

Let's turn int to long and hopefully it will work better

$ gcc part2.c && ./a.out
46430496411

Perfect!


  for (i = 0; i < nbNumbers; i++, end++) {
    total += numbers[i];
    if (total == TARGET && start != end) {
      break;
    }
    // I'm using C, I've got to use pattern mere mortals can't understand
    // why use two lines when only one can do the trick
    while (total > TARGET) {
      total -= numbers[start++];
    }
  }


  outer: for (start = 0; start < nbNumbers; start++) {
    for (end = start; end < nbNumbers; end++) {
      if (total == TARGET && start != end) {
        break outer;
      }
      if (total > TARGET) {
        continue outer;
      }
    }
  }

what labels on loops do not work ?
yeah I'm gonna use goto!
https://xkcd.com/292/

using goto as a continue is actually very error prone:
if you set your label before, you'll restart your loop everytime.
But if you set it after, you'll miss the increment step.
So you need to do the inc step yourself and set the label inside


Wow now it works. I just need a simple loop to find the min and max and it's won


    if (number > max) {
      max = number;
    } else if (number < min) {
      min = number;
    }

I felt really smart about my else if and it's actually false.
A number good do both: in this case the min is the first number so it wrecks my whole algorithm

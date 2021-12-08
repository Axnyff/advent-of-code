cat input | 
  awk '
  BEGIN {total = 0}
  {i = 0; seen_pipe = 0
    for (; i <= NF; i++) {
      if ($i == "|") {
        seen_pipe = 1
      }
    if (seen_pipe && (length($i) ==2 || length($i) == 4 || length($i) == 7 || length($i) == 3)) {
      total++
    }
}
}
END { print total }'

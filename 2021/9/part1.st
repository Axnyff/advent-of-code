f := FileStream open: 'test-input' mode: FileStream read.
contents := f contents.
lines := contents tokenize: '\n'.

N1 := lines size.

N2 := (lines at: 1) size.

getKey := [:i :j |
  (i displayString), '-', (j displayString)
].

l := Dictionary new.
1 to: N1 do: [:i |
  1 to: N2 do: [:j |
    line := lines at: i.
    char := line at: j.
    l at: (getKey value: i value: j) put: ((char displayString) asNumber).
  ].
].

l printNl.

total := 0
1 to: N1 do: [:i |
  1 to: N2 do: [:j |

    value := l at: (getKey value: i value: j).
    value printNl.

    down := l at: (getKey value: (i + 1) value: j) ifAbsent: [10].
    up := l at: (getKey value: (i - 1) value: j) ifAbsent: [10].
    right := l at: (getKey value: i value: (j + 1)) ifAbsent: [10].
    left := l at: (getKey value: i value: (j - 1)) ifAbsent: [10].


    test := (value < left) & (value < right) & (value < up) & (value < down).
    test ifTrue: [
      "'value : ' print.
      value print.
      ' ' print.
      left print.
      ' ' print.
      right print.
      j printNl."
      total := ((total + value) + 1).
    ].
  ].
].

total printNl.

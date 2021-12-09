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

total := 0
1 to: N1 do: [:i |
  1 to: N2 do: [:j |

    value := l at: (getKey value: i value: j).
    value print.

    down := l at: (getKey value: (i + 1) value: j) ifAbsent: [10].
    yolo := 1.
    value print.
    yolo := l at: (getKey value: (i - 1) value: j) ifAbsent: [10].
    value print.
    right := l at: (getKey value: i value: (j + 1)) ifAbsent: [10].
    value print.
    left := l at: (getKey value: i value: (j - 1)) ifAbsent: [10].

    value printNl.


    test := (value < left) & (value < right) & (value < yolo) & (value < down).
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

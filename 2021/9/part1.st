f := FileStream open: 'test-input' mode: FileStream read.
contents := f contents.
lines := contents tokenize: '\n'.

N1 := lines size.

N2 := (lines at: 1) size.

l := Dictionary new.
1 to: N1 do: [:i |
  1 to: N2 do: [:j |
    line := lines at: i.
    char := line at: j.
    arr := Array new: 2.
    arr at: 1 put: i.
    arr at: 2 put: j.
    l at: arr put: ((char displayString) asNumber).
  ].
].


total := 0
2 to: 2 do: [:i |
  1 to: 1 do: [:j |
    arr := Array new: 2.
    arr at: 1 put: i.
    arr at: 2 put: j.

    value := l at: arr.
    value := value + 0.
    'Value : ' print.
    value printNl.

    arrD := Array new: 2.
    arrD at: 1 put: (i + 1).
    arrD at: 2 put: j.
    down := l at: arrD ifAbsent: [10].

    'Value : ' print.
    value printNl.

    arrU := Array new: 2.
    arrU at: 1 put: (i - 1).
    arrU at: 2 put: j.
    up := l at: arrU ifAbsent: [].

    'Value : ' print.
    value printNl.

    'Value : ' print.
    value printNl.


    arr at: 1 put: i.
    arr at: 2 put: (i + 1).
    right := l at: arr ifAbsent: [10].

    arr at: 2 put: (i - 1).
    left := l at: arr ifAbsent: [10].

    'Value : ' print.
    value printNl.
    '' printNl.

    "test := (value < left) & (value < right) & (value < up) & (value < down).
    test ifTrue: [
      total := ((total + value) + 1).
    ]."
  ].
].

total printNl.

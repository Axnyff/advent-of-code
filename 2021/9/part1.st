f := FileStream open: 'test-input' mode: FileStream read.
contents := f contents.
lines := contents tokenize: '\n'.

N1 := lines size.

N2 := (lines at: 1) size.

getKey := [:i :j |
  (i displayString), '-', (j displayString)
].

dico := Dictionary new.
1 to: N1 do: [:i |
  1 to: N2 do: [:j |
    line := lines at: i.
    char := line at: j.
    dico at: (getKey value: i value: j) put: ((char displayString) asNumber).
  ].
].

total := 0
1 to: 5 do: [:i |
  1 to: 5 do: [:j |

    key := (getKey value: i value: j).

    yoloooo := dico at: key.
    yoloooo print.
    key print.


    yolo := 1.
    "left := 3."

    yoloooo := dico at: key.
    (dico at: key) printNl.
    yoloooo printNl.


  ].
].

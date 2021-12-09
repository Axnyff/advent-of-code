f := FileStream open: 'test-input' mode: FileStream read.
contents := f contents.
lines := contents tokenize: '\n'.
lines printNl.

l := Dictionary new.
l at: lines put: 3.
(l at: 3 ifAbsent: []) printNl.

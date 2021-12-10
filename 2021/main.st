| dict |
dict := Dictionary new.
dict at: 1 put: 1.
dict at: 2 put: 2.
dict at: 3 put: 3.
dict at: 4 put: 4.


1 to: 4 do: [:j |
  "The following is a list of variables used in this code block"
  | key value 
    unrelated unrelated2 unrelated3 unrelated4 unrelated5
    unrelated6 unrelated7 unrelated8 unrelated9 unrelated10 |

  key := j.

  value := dict at: key.
  value print.

  unrelated := 1.
  unrelated2 := 1.
  unrelated3 := 1.
  unrelated4 := 1.
  unrelated5 := 1.
  unrelated6 := 1.
  unrelated7 := 1.
  unrelated8 := 1.
  unrelated9 := 1.
  unrelated10 := 1.

  value printNl.
].

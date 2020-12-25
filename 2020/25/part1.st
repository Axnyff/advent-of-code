publicKey1 := 11239946.
publicKey2 := 10464955.

findLoopSize := [ :publicKey |
  value := 1.
  loopSize := 0.
  [value ~= publicKey] whileTrue: [
    loopSize := loopSize + 1.
    value := value * 7.
    value := value \\ 20201227.
  ].
  loopSize
].

transformSubjectNumber := [:loopSize :subjectNumber |
  value := 1.
  i := loopSize.
  [i ~= 0] whileTrue: [
    i := i - 1.
    value := value * subjectNumber.
    value := value \\ 20201227.
  ].
  value.
].


(transformSubjectNumber value: (findLoopSize value: publicKey1) value: publicKey2) printNl


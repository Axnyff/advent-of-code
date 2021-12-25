import std/strutils

var lines = split(readFile("input"), "\n")
lines.del(len(lines) - 1)

var hasChanges = true
var steps = 0
while hasChanges:
  hasChanges = false
  steps += 1
  var newLines: seq[string] = @[]
  for i, c in lines:
    newlines.add(c)
  for i, str in lines:
    for j,c in str:
      if c == '>' and str[(j+1) mod len(str)] == '.':
        newLines[i][j] = '.'
        newLines[i][(j + 1) mod len(str)] = '>'
        hasChanges = true
  var newnewLines: seq[string] = @[]
  for i, c in newLines:
    newnewLines.add(c)
  for i, str in newLines:
    for j,c in str:
      if c == 'v' and newLines[(i+1) mod len(newLines)][j] == '.':
        newnewLines[i][j] = '.'
        newnewLines[(i + 1) mod len(newnewLines)][j] = 'v'
        hasChanges = true
  lines = newnewLines


echo(steps)

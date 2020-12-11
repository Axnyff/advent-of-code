package main

import (
  "fmt"
  "io/ioutil"
  "strings"
)

func countNeighbours(lines []string, i int, j int) int {
  count := 0
  for k := i - 1; k <= i + 1; k++ {
    for l := j - 1; l <= j + 1; l++ {
      if k == i && l == j {
        continue
      }
      if k >= 0 && k < len(lines) && l >= 0 && l < len(lines[0]) && lines[k][l:l + 1] == "#" {
        count++
      }
    }
  }
  return count
}

func iter(lines []string) ([]string, bool) {
  newLines := []string{}
  hasChange := false
  for i := 0; i < len(lines); i++ {
    line := ""
    for j := 0; j < len(lines[0]); j++ {
      count := countNeighbours(lines, i,  j)

      if count == 0 && lines[i][j: j + 1] == "L" {
        hasChange = true
        line = line + "#";
      } else if count >= 4 && lines[i][j:j + 1] == "#" {
        hasChange = true
        line = line + "L";
      } else {
        line += lines[i][j:j+1]
      }
    }
    newLines = append(newLines, line);
  }
  return newLines, hasChange
}

func main() {
  data, err := ioutil.ReadFile("input")
  if err != nil {
    panic(err)
  }
  contents := string(data)
  lines := strings.Split(contents, "\n")
  lines = lines[0:len(lines) - 1]

  hasChange := true;
  for hasChange {
    lines, hasChange = iter(lines);
  }
  occupiedCount := 0

  for i := 0; i < len(lines); i++ {
    for j := 0; j < len(lines[0]); j++ {
      if lines[i][j:j+1] == "#" {
        occupiedCount++
      }
    }
  }
  fmt.Println(occupiedCount)
}

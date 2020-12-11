package main

import (
  "fmt"
  "io/ioutil"
  "strings"
)

func countNeighbours(lines []string, i int, j int) int {
  count := 0

  for k:= i + 1; k < len(lines); k++ {
    if lines[k][j:j+1] == "#" {
      count++
      break
    }
    if lines[k][j:j+1] == "L" {
      break
    }
  }

  for k:= i - 1; k >= 0; k-- {
    if lines[k][j:j+1] == "#" {
      count++
      break
    }
    if lines[k][j:j+1] == "L" {
      break
    }
  }

  for l:= j + 1; l < len(lines[0]); l++ {
    if lines[i][l:l+1] == "#" {
      count++
      break
    }
    if lines[i][l:l+1] == "L" {
      break
    }
  }

  for l:= j - 1; l >= 0 ; l-- {
    if lines[i][l:l+1] == "#" {
      count++
      break
    }
    if lines[i][l:l+1] == "L" {
      break
    }
  }

  for k, l := i + 1, j + 1; k < len(lines) && l < len(lines[0]); k, l = k + 1, l + 1 {
    if lines[k][l:l+1] == "#" {
      count++
      break
    }
    if lines[k][l:l+1] == "L" {
      break
    }
  }

  for k, l := i - 1, j + 1; k >= 0 && l < len(lines[0]); k, l = k - 1, l + 1 {
    if lines[k][l:l+1] == "#" {
      count++
      break
    }
    if lines[k][l:l+1] == "L" {
      break
    }
  }

  for k, l := i - 1, j - 1; k >= 0 && l >= 0; k, l = k - 1, l - 1 {
    if lines[k][l:l+1] == "#" {
      count++
      break
    }
    if lines[k][l:l+1] == "L" {
      break
    }
  }

  for k, l := i + 1, j - 1; k < len(lines) && l >= 0; k, l = k + 1, l - 1 {
    if lines[k][l:l+1] == "#" {
      count++
      break
    }
    if lines[k][l:l+1] == "L" {
      break
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
      } else if count >= 5 && lines[i][j:j + 1] == "#" {
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

  hasChange := true
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

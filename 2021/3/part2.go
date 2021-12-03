package main

import (
  "fmt"
  "io/ioutil"
  "strings"
  "strconv"
)

func main() {
  data, err := ioutil.ReadFile("data.fs")
  if err != nil {
    panic(err)
  }
  contents := string(data)

  lines := strings.Split(contents, "\n")
  lines = lines[:len(lines) - 1]


  var result []string
  temp := lines

  var bit = 0
  for {
    var mostCommon = 0
    var count1 = 0
    var count0 = 0
    result = nil
    for _, element := range temp {
      if element[bit] == 49 {
        count1 += 1
      } else {
        count0 += 1
      }
    }

    if (count1 >= count0) {
      mostCommon = 49
    } else {
      mostCommon = 48
    }

    for _, element := range temp {
      if int(element[bit]) == mostCommon {
        result = append(result, element)
      }
    }
    if (len(result) == 1) {
      break
    }
    temp = result
    bit += 1
  }

  var most, _ = strconv.ParseInt(result[0], 2, 0)


  temp = lines

  bit = 0
  for {
    var leastCommon = 0
    var count1 = 0
    var count0 = 0
    result = nil
    for _, element := range temp {
      if element[bit] == 49 {
        count1 += 1
      } else {
        count0 += 1
      }
    }

    if (count1 >= count0) {
      leastCommon = 48
    } else {
      leastCommon = 49
    }

    for _, element := range temp {
      if int(element[bit]) == leastCommon {
        result = append(result, element)
      }
    }
    if (len(result) == 1) {
      break
    }
    temp = result
    bit += 1
  }

  var least, _ = strconv.ParseInt(result[0], 2, 0)
  fmt.Println(least * most)
}

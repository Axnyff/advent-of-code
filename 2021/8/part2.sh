cat input | 
  awk '
BEGIN {
  total = 0
  for (i = 0; i < 10; i++) {
    defs[i][0] = 1
  }
  split("abcefg", defs[0], "")
  split("cf", defs[1], "")
  split("acdeg", defs[2], "")
  split("acdfg", defs[3], "")
  split("bcdf", defs[4], "")
  split("abdfg", defs[5], "")
  split("abdeg", defs[6], "")
  split("acf", defs[7], "")
  split("abcdefg", defs[8], "")
  split("abcdfg", defs[9], "")


  split("abcdefg", raw_letters, "")
  for (key in raw_letters) {
    letters[raw_letters[key]] = 1
  }
}

function contains(array, target,  i) {
  for (i in array) {
    if (array[i] == target) {
      return 1
    }
  }
  return 0
}

function extraItem(str1, str2,   i) {
  split(str1, array1, "")
  split(str2, array2, "")
  for (i in array1) {
    if (!contains(array2, array1[i])) {
      return array1[i]
    }
  }
  return ""
}

function printarray(array,   i) {
  for (i in array) {
    print(i ": " array[i])
  }
}

function findNumber(num) {
  if (length(num) == 2) {
    return 1
  }
  if (length(num) == 3) {
    return 7
  }
  if (length(num) == 7) {
    return 8
  }
  if (length(num) == 4) {
    return 4
  }
  if (length(num) == 5) {
    if (extraItem(result["b"], num)) {
      if (extraItem(result["e"], num)) {
        return 3
      } else {
        return 2
      }
    } else {
      return 5
    }
  }
  if (length(num) == 6) {
    if (extraItem(result["e"], num)) {
      return 9
    }
    if (extraItem(result["d"], num)) {
      return 0
    }
    return 6
  }

}



{
  for (i = 0; i < NF; i++ ) {
    if (length($i) == 2) {
      str2 = $i
    }
    if (length($i) == 3) {
      str3 = $i
    }
    if (length($i) == 4) {
      str4 = $i
    }
    if (length($i) == 7) {
      str7 = $i
    }
  }
  result["a"] = (extraItem(str3, str2))

  for (i = 0; i < NF; i++ ) {
    if (length($i) == 6) {
      extra = extraItem(str2, $i)
      if (extra) {
        result["c"] = extra
        result["f"] = extraItem(str2, extra)
      }
    }
  }

  for (i = 0; i < NF; i++ ) {
    if (length($i) == 6) {
      extra = extraItem(str2, $i)
      if (extra) {
        result["c"] = extra
        result["f"] = extraItem(str2, extra)
      }
    }
  }

  for (i = 0; i < NF; i++ ) {
    if (length($i) == 6) {
      extra = extraItem(str2, $i)
      if (!extra) {
        extra = extraItem(str4, $i)
        if (extra) {
          result["d"] = extra
        } else {
          result["e"] = extraItem(str7, $i)
          result["g"] = extraItem(str7, str4 result["a"] result["e"])
        }
      }
    }
  }

  result["b"] = extraItem(str7, result["a"] result["c"] result["d"] result["e"] result["f"] result["g"])
  total += findNumber($(NF -3)) * 1000
  total += findNumber($(NF -2)) * 100
  total += findNumber($(NF -1)) * 10
  total += findNumber($(NF))
}

END {
  print total
}
'

# d -> a
# e -> b
# a -> c
# f -> d
# g -> e
# b -> f
# c -> g


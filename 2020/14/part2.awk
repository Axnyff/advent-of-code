function toBinary(decimal) {
  result = ""
  while (decimal > 0) {
    # "Explicit" string concatenation, otherwise it's a pain in the ass to understand
    result = (decimal % 2) "" result;
    decimal = int(decimal / 2)
  }
  while (length(result) < 36) {
    result = "0" "" result
  }
  return result;
}

function toDecimal(binary) {
  split(binary, binaryBits, "")
  result = 0
  for (i in binaryBits) {
    result = result * 2;
    result = result + binaryBits[i]
  }
  return result
}

function applyMask(mask, value) {
  value = toBinary(value + 0)
  split(mask, maskBits, "")
  split(value, valueBits, "")
  result = ""
  for (i in maskBits) {
    bit = maskBits[i]
    if (bit == "0" ) {
      result = result "" valueBits[i]
    } else {
      result = result "" bit
    }
  }
  return result
}

function getAllSubs(value, values) {
  if (value == "") {
    for (key in values) {
      result_arr[key] = values[key]
    }
    delete new_values
    delete values
    return
  }
  item = substr(value, 0, 1)
  new_values_length = 0
  for (key in values) {
    if (item == "X") {
      new_values[new_values_length++] = values[key] "0"
      new_values[new_values_length++] = values[key] "1"
    } else {
      new_values[new_values_length++] = values[key] "" item
    }
  }
  for (key in new_values) {
    values[key] = new_values[key]
  }
  return getAllSubs(substr(value, 2, 500), values)
}


/./ {
  if ($1 == "mask") {
    mask = $3
  } else {
    sub("mem\\[", "", $1)
    sub("\\]", "", $1)
    values[0] = ""
    maskedMemory = applyMask(mask, $1)
    delete result_arr
    getAllSubs(maskedMemory, values)
    for (key in result_arr) {
      mem[result_arr[key]] = $3
    }
  }
}

END {
  total = 0
  for (key in mem) {
    total = total + mem[key]
  }
  print total
}

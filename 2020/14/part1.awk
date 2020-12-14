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
    if (bit == "0" || bit == "1") {
      result = result "" bit
    } else {
      result = result "" valueBits[i]
    }
  }
  return toDecimal(result)
}

BEGIN {
}
/./ {
  if ($1 == "mask") {
    mask = $3
  } else {
    sub("mem\\[", "", $1)
    sub("\\]", "", $1)
    mem[$1] = applyMask(mask, $3)
  }
}
END {
  total = 0
  for (key in mem) {
    total = total + mem[key]
  }
  print total
}

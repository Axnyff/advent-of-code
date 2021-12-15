local i = 1
local iMax = 1
local jMax = 1
local table = {}


function key(i, j)
  return "" .. i .. "-" .. j
end

for line in io.lines('input') do
  for j = 1, #line do
      local c = line:sub(j,j)
      table[key(i, j)] = tonumber(c)
      jMax = j
  end
  i = i + 1
  iMax = i
end
iMax = iMax - 1

local dp = {}
dp["1-1"] = table[key(1, 1)]
for i = 2, iMax do
  dp[key(i, 1)] = dp[key(i - 1, 1)] + table[key(i, 1)]
end
for j = 2, jMax do
  dp[key(1, j)] = dp[key(1, j - 1)] + table[key(1, j)]
end

for i = 2, iMax do
  for j = 2, jMax do
    dp[key(i, j)] = table[key(i, j)] + math.min(
      dp[key(i -1, j)], dp[key(i, j -1)]
    )
  end
end

print(dp[key(iMax, jMax)] - dp["1-1"])


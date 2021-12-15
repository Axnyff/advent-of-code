local i = 1
local iMax = 1
local jMax = 1
local data = {}


function key(i, j)
  return "" .. i .. "-" .. j
end

for line in io.lines('input') do
  for j = 1, #line do
    local c = line:sub(j,j)
    data[key(i, j)] = tonumber(c)
    jMax = j
  end
  i = i + 1
  iMax = i
end
iMax = iMax - 1

for i = iMax + 1, iMax * 5 do
  for j = 1, jMax do
    local value = data[key(i - iMax, j)] + 1
    if (value > 9) then
      value = 1
    end
    data[key(i, j)] = value
  end
end

for i = 1, iMax  do
  for j = jMax + 1, jMax * 5 do
    local value = data[key(i, j - jMax)] + 1
    if (value > 9) then
      value = 1
    end
    data[key(i, j)] = value
  end
end

for i = jMax + 1, jMax * 5  do
  for j = jMax + 1, jMax * 5 do
    local value = data[key(i, j - jMax)] + 1
    if (value > 9) then
      value = 1
    end
    data[key(i, j)] = value
  end
end


local dp = {}
dp["1-1"] = data[key(1, 1)]
for i = 2, iMax * 5 do
  dp[key(i, 1)] = dp[key(i - 1, 1)] + data[key(i, 1)]
end
for j = 2, jMax * 5 do
  dp[key(1, j)] = dp[key(1, j - 1)] + data[key(1, j)]
end

best = 0
temp = 1
while (temp ~= best) do
  best = temp
  for i = 2, iMax * 5 do
    for j = 2, jMax * 5 do
      local new_val = data[key(i, j)] + math.min(
        dp[key(i -1, j)],
        dp[key(i, j -1)],
        dp[key(i, j + 1)] or 9999,
        dp[key(i +1, j)] or 9999
      )
      dp[key(i, j)] = new_val
    end
  end
  temp = (dp[key(iMax * 5, jMax * 5)] - dp["1-1"])
  print(temp)
end

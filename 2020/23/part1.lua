raw_data = "398254716"

data = {}

for i = 1, string.len(raw_data) do
  index = tonumber(raw_data:sub(i, i))
  value = raw_data:sub(i + 1, i + 1)
  if value == "" then
    value = raw_data:sub(1, 1)
  end
  data[index] = tonumber(value)
end

function tableContainValue(table, element) 
  for _, value in pairs(table) do
    if value == element then
      return true
    end
  end
  return false
end

function playGame(data, current, nbRounds)
  for i = 1,nbRounds do
    picked = {data[current], data[data[current]], data[data[data[current]]]}
    data[current] = data[picked[3]]
    target = current -1
    while tableContainValue(picked, target) or data[target] == nil do
      target = target - 1
      if target <= 0 then
        target = 9
      end
    end
    previous = data[target]
    data[target] = picked[1]
    data[picked[3]] = previous
    current = data[current]
  end
  return data
end

function printResult(data, startPoint)
  res = tostring(startPoint)

  while (res:len() < 9) do
    res = res .. data[startPoint]
    startPoint = data[startPoint]
  end
  return res
end

result = playGame(data, tonumber(raw_data:sub(1, 1)), 100)


print(printResult(result, 1):sub(2))

raw_data = "398254716"

NB_ITEMS = 1000 * 1000
data = {}

for i = 1, string.len(raw_data) do
  index = tonumber(raw_data:sub(i, i))
  value = raw_data:sub(i + 1, i + 1)
  if value == "" then
    value = raw_data:sub(1, 1)
  end
  data[index] = tonumber(value)
end

data[NB_ITEMS] = tonumber(raw_data:sub(1, 1))
data[tonumber(raw_data:sub(raw_data:len(), raw_data:len()))] = 10

for i = 10, NB_ITEMS - 1 do
  data[i] = i + 1
end

function tableContainValue(table, element) 
  for _, value in pairs(table) do
    if value == element then
      return true
    end
  end
  return false
end

function playGame(data, current, nbRounds, max)
  for i = 1,nbRounds do
    picked = {data[current], data[data[current]], data[data[data[current]]]}
    data[current] = data[picked[3]]
    target = current -1
    while tableContainValue(picked, target) or data[target] == nil do
      target = target - 1
      if target <= 0 then
        target = max
      end
    end
    previous = data[target]
    data[target] = picked[1]
    data[picked[3]] = previous
    current = data[current]
  end
  return data
end

result = playGame(data, tonumber(raw_data:sub(1, 1)), 10 * NB_ITEMS, NB_ITEMS)
print(result[1] * result[result[1]])

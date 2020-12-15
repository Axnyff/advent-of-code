raw_data = [9,12,1,4,17,0,18]

hash = {}

for i in 0..raw_data.length() - 2 do
  hash[raw_data[i]] = i + 1
end


last_spoken = raw_data.last
for i in raw_data.length()..30000000 - 1 do
  if hash[last_spoken] == nil then
    hash[last_spoken] = i
    last_spoken = 0
  else
    temp = i - hash[last_spoken]
    hash[last_spoken] = i
    last_spoken = temp
  end
end

puts last_spoken

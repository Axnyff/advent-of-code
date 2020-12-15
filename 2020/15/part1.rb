data = [9,12,1,4,17,0,18]

def find_age(index, number, data)
  return data.rindex(number) == nil ? 0 : (index - data.rindex(number))
end

for i in data.length()..2019 do
    age = find_age(i - 1, data[i - 1], data.slice(0, i - 1))
    data.push(age)
end

puts(data.last)

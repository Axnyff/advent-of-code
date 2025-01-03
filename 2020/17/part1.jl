input_lines = open("input") do file
  readlines(file)
end

data = Dict((1, 1, 1) => '.')
for (y, line) in enumerate(input_lines)
  for (x, c) in enumerate(line)
    data[(x, y, 1)] = c
  end
end

function count_neighbours(data, (x, y, z))
  total = 0
  for x1 in x-1: x + 1
    for y1 in y-1: y + 1
      for z1 in z-1: z + 1
        if (x, y, z) != (x1, y1, z1) && get!(data, (x1, y1, z1), '.') == '#'
          total += 1
        end
      end
    end
  end
  return total
end

function count_active(data)
  total = 0
  for value in values(data)
    if value == '#'
      total += 1
    end
  end
  return total
end

for i in 1:6
  all_keys = collect(keys(data))

  new_data = Dict((1, 1, 1) => '.')
  min_x = min(map(x  -> x[1], all_keys)...) - 1
  max_x = max(map(x  -> x[1], all_keys)...) + 1
  min_y = min(map(x  -> x[2], all_keys)...) - 1
  max_y = max(map(x  -> x[2], all_keys)...) + 1
  min_z = min(map(x  -> x[3], all_keys)...) - 1
  max_z = max(map(x  -> x[3], all_keys)...) + 1
  for x in min_x:max_x
    for y in min_y:max_y
      for z in min_z:max_z
        coords = (x, y, z)
        status = get!(data, coords, '.')
        neighours = count_neighbours(data, coords)
        if (status == '.' && neighours != 3) || (status== '#' && neighours != 3 && neighours != 2)
          new_data[(coords)] = '.'
        else 
          new_data[(coords)] = '#'
        end
      end
    end
  end
  global data = new_data
end

println(count_active(data))

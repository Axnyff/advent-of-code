f = open("input")
lines = readlines(f)
close(f)

mySet = Set()
for line in lines
  matches = match(r"(\w+) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)", line)
  on = matches[1] == "on"
  xmin = parse(Int64, matches[2])
  xmax = parse(Int64, matches[3])

  ymin = parse(Int64, matches[4])
  ymax = parse(Int64, matches[5])

  zmin = parse(Int64, matches[6])
  zmax = parse(Int64, matches[7])

  for x in range(max(-50, xmin), min(xmax, 50))
    for y in range(max(-50, ymin), min(ymax, 50))
      for z in range(max(-50, zmin), min(zmax, 50))
        key = "$(x),$(y),$(z)"
        if on
          global mySet = push!(mySet, key)
        else
          global mySet = delete!(mySet, key)
        end
      end
    end
  end
end
println(length(mySet))

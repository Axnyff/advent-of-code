f = open("input")
lines = readlines(f)
close(f)

total = 0

function volume(segment)
  x1 = segment[1][1]
  x2 = segment[1][2]

  y1 = segment[2][1]
  y2 = segment[2][2]

  z1 = segment[3][1]
  z2 = segment[3][2]
  return (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);
end

function lineOverlap(a, b)
  return [max(a[1], b[1]), min(a[2], b[2])]
end

function overlap(segment, segments)
  total = 0
  for (index, otherSegment) in enumerate(segments)
    overlapX = lineOverlap(segment[1], otherSegment[1])

    minX = overlapX[1]
    maxX = overlapX[2]
    overlapY = lineOverlap(segment[2], otherSegment[2])
    minY = overlapY[1]
    maxY = overlapY[2]
    overlapZ = lineOverlap(segment[3], otherSegment[3])
    minZ = overlapZ[1]
    maxZ = overlapZ[2]
    if (maxX >= minX && maxY >= minY && maxZ >= minZ)
      newSegment = [[minX, maxX], [minY, maxY], [minZ, maxZ]]
      total = total + volume(newSegment)
      newSegments = []
      for i in range(1 + index, length(segments))
        push!(newSegments, segments[i])
      end
      total -= overlap(newSegment, newSegments)
    end

  end
  return total
end

segments = []
for (index, line) in enumerate(reverse(lines))
  matches = match(r"(\w+) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)", line)
  on = matches[1] == "on"
  xmin = parse(Int64, matches[2])
  xmax = parse(Int64, matches[3])

  ymin = parse(Int64, matches[4])
  ymax = parse(Int64, matches[5])

  zmin = parse(Int64, matches[6])
  zmax = parse(Int64, matches[7])
  segment = [[xmin, xmax], [ymin, ymax], [zmin, zmax]]
  if (on)
    global total += volume(segment)
    global total -= overlap(segment, segments)
  end
  global segments = push!(segments, segment)
end
println(total)

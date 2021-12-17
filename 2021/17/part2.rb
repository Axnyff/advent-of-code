file = File.open("input")
file_data = file.readlines.map(&:chomp)[0]
file.close
file_data = file_data.gsub("target area: ", "")
x, y = file_data.split(", ")
x0, x1 = x.split("..")
y0, y1 = y.split("..")

$x0 = x0.gsub("x=", "").to_i
$x1 = x1.to_i
$y0 = y0.gsub("y=", "").to_i
$y1 = y1.to_i

$max = 0
def valid(xv, yv)
  x = 0
  y = 0
  init_xv = xv
  init_yv = yv
  while x < $x1 
    x = x + xv
    y = y + yv
    if xv > 0
      xv = xv - 1
    end
    yv = yv -1
    if x >= $x0 and x <= $x1 && y>= $y0 && y <= $y1
      return true
    end
    if xv == 0
      if y < $y0 and yv < 0
        return false
      end
    end
  end
  return false
end

YMIN = -5000
y = YMIN
x = 0

count = 0
while x < 1000
  y = YMIN
  while y < 1000
    if valid(x, y)
      count = count + 1
    end
    y = y + 1
  end
  x = x + 1
end
puts count

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
  ymax = 0
  while x < $x1 
    x = x + xv
    y = y + yv
    if xv > 0
      xv = xv - 1
    else
      xv = xv + 1
    end
    yv = yv -1
    if y > ymax
      ymax = y
    end
    if x >= $x0 and x <= $x1 && y>= $y0 && y <= $y1
      if ymax > $max
        $max = ymax
      end
      return true
    end
    if x == 0
      return false
    end
  end
  return false
end

ymax = 0

y = -10
x = -10

while x < 1000
  y = 1
  while y < 1000
    if valid(x, y) and y > ymax
      ymax = y
    end
    y = y + 1
  end
  x = x + 1
end
puts $max

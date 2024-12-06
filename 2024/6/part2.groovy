String fileContents = new File('input').text
String[] lines = fileContents.tokenize("\n")

def map = [:]
def key(long x, long y) {
  return x + "-" + y
}

def unkey(String key) {
  def (x, y) = key.tokenize("-")
  return [x.toInteger(), y.toInteger()]
}

def start = ""

for (i = 0; i < lines.length; i++) {
  String[] item = lines[i].split("")
  for (j = 0; j < item.length; j++) {
    map[key(j, i)] = item[j]
    if (item[j] == "^") {
      start = [j, i]
    }
  }
}

def rotateDir(dir) {
  if (dir == [0, 1]) {
    return [-1, 0]
  }
  if (dir == [1, 0]) {
    return [0, 1]
  }
  if (dir == [0, -1]) {
    return [1, 0]
  }
  if (dir == [-1, 0]) {
    return [0, -1]
  }
}

def dir = [0, -1]
def pos = start
def count = 0

def path = [:]
println("Start")
while (true) {
  def (x, y) = pos
  def (dx, dy) = dir
  def newX = x + dx
  def newY = y + dy
  def newKey = key(newX, newY)
  if (!map[newKey]) {
    println(count)
    break
  }
  if (map[newKey] == "#") {
    dir = rotateDir(dir)
  } else {
    pos = [newX, newY]
    if (!path[key(newX, newY)]) {
      path[key(newX, newY)] = "#"
      count += 1
    }
  }
}

count = 0

def is_stuck(possible, map, start) {
  map[possible] = "#"
  def loops = [:]
  def pos = start
  def dir = [0, -1]
  while(true) {
    def (x, y) = pos
    def (dx, dy) = dir
    if (loops[x + "-" + y + "-" + dx + "-" + dy]) {
      map[possible] = "."
      return true
    }
    loops[x + "-" + y + "-" + dx + "-" + dy] = "#"
    def newX = x + dx
    def newY = y + dy
    def newKey = key(newX, newY)
    if (!map[newKey]) {
      map[possible] = "."
      return false
    }
    if (map[newKey] == "#") {
      dir = rotateDir(dir)
    } else {
      pos = [newX, newY]
    }
  }
}
for (possible in path) {
  if (is_stuck(possible.key, map, start)) {
    count += 1
  }
}
println(count - 1)

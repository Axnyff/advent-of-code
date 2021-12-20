def lines = new File("input").readLines();
// 5465
// 6435

def translationLines = lines.takeWhile { it.length() > 1}

def translation = translationLines.join("") + " "

def imageLines = lines.drop(translationLines.size() + 1)

  def imageData = [:]

  imageLines.eachWithIndex { line, row ->
    line.eachWithIndex { item, col ->
      if (item == "#") {
        imageData[col, row] = true
      }
    }
  }

def printPoints(imageData) {
  imageData.keySet().each {
    println(it.join(" "))
  }
}

def getBoundaries(imageData) {
  def rowmin = 0
    def rowmax = 0
    def colmin = 0
    def colmax = 0

    imageData.each { 
      (col, row) = it.key
        if (col < colmin) {
          colmin = col
        }
      if (row < rowmin) {
        rowmin = row
      }

      if (col > colmax) {
        colmax = col
      }
      if (row > rowmax) {
        rowmax = row
      }
    }

  return [rowmin, rowmax, colmin, colmax]
}

def printImage(imageData) {
  def rowmin
    def rowmax
    def colmin
    def colmax
    (rowmin, rowmax, colmin, colmax) = getBoundaries(imageData)
    (rowmin-1..rowmax+2).each { row ->
      (colmin-1..colmax+2).each { col ->
        if (imageData.get([col, row], false)) {
          print("#")
        } else {
          print(".")
        }
      }
      println()
    }

}
def compute(imageData, translation) {
  def rowmin
    def rowmax
    def colmin
    def colmax
    (rowmin, rowmax, colmin, colmax) = getBoundaries(imageData)
    def imageDataTemp = [:]


    (rowmin - 30..rowmax + 30).each { row ->
      (colmin - 30..colmax + 30).each { col ->
        def items = [
          imageData.get([col - 1, row -1], false) ? "1" : "0",
          imageData.get([col, row -1], false) ? "1" : "0",
          imageData.get([col + 1, row -1], false) ? "1" : "0",
          imageData.get([col - 1, row], false) ? "1" : "0",
          imageData.get([col, row], false) ? "1" : "0",
          imageData.get([col + 1, row], false) ? "1" : "0",
          imageData.get([col - 1, row + 1], false) ? "1" : "0",
          imageData.get([col, row + 1], false) ? "1" : "0",
          imageData.get([col + 1, row + 1], false) ? "1" : "0",
        ]
          def index = Integer.parseInt(items.join(""), 2)
          if (translation[index] == "#") {
            imageDataTemp[col, row] = true
          }
      }
    }
  return imageDataTemp
}

def nbLoops = 25 
(0..nbLoops - 1).each {
  def rowmin
  def rowmax
  def colmin
  def colmax
  (rowmin, rowmax, colmin, colmax) = getBoundaries(imageData)
  imageData = compute(imageData, translation)
  imageData = compute(imageData, translation)
  def keys = imageData.keySet().collect()
  keys.each {
    def x
    def y
    (x, y) = it
    if (x <= colmin -3 || x >= colmax + 3 || y <= rowmin - 3 || y >= rowmax + 3) {
      imageData.remove(it)
    }
  }

}
  def pixels = imageData.keySet().size()
println(pixels)

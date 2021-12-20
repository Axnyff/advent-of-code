def lines = new File("test-input").readLines();
// 5465
// 6435

def translationLines = lines.takeWhile { it.length() > 1}

def translation = translationLines.join("")
def expected = 
"..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#"

println(expected.length())
println(translation === expected)
expected.eachWithIndex { val, i ->
  print([val, translation[i], val == translation[i]])
}

def imageLines = lines.drop(translationLines.size() + 2)

def imageData = [:]

imageLines.eachWithIndex { line, row ->
  line.eachWithIndex { item, col ->
    if (item == "#") {
      imageData[col, row] = true
    }
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


      (rowmin - 1..rowmax + 2).each { row ->
        (colmin - 1..colmax + 2).each { col ->
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
            if (row == 5 && col == 5) {
              println(items)
              print(index)
              print(translation[index -1])
            }
          if (index !== 0) {
            if (translation[index] == "#") {
              imageDataTemp[col, row] = true
            }
          }
        }
      }
    return imageDataTemp
  }

def nbLoops = 1
(0..nbLoops - 1).each {
  imageData = compute(imageData, translation)
}

printImage(imageData)
def pixels = 0

(rowmin, rowmax, colmin, colmax) = getBoundaries(imageData)
  (rowmin-1..rowmax+2).each { row ->
    (colmin-1..colmax+2).each { col ->
      if (imageData.get([col, row], false)) {
        pixels = pixels + 1
      }
    }
  }

println(pixels)

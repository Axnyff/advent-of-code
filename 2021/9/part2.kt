import java.io.File

fun getSizeBasin(basin: Pair<Int, Int>, map: HashMap<Pair<Int, Int>, Int>): Int {
  var items: MutableList<Pair<Int, Int>> = mutableListOf(basin)
  var hasChange = true

  while (hasChange) {
    hasChange = false
    var nextItems: MutableList<Pair<Int, Int>> = mutableListOf()
    nextItems.addAll(items)
    for ((i, j) in items) {
      val possibleNew = listOf(Pair(i + 1, j), Pair(i - 1, j), Pair(i, j + 1), Pair(i, j - 1))
      for (possible in possibleNew) {
        if (!nextItems.contains(possible) && map.getOrElse(possible, {9}) != 9) {
          nextItems.add(possible)
          hasChange = true
        }
      }
    }
    items = nextItems
  }
  return items.size
}

fun main() {
  val lines = File("input").readLines()
  val map: HashMap<Pair<Int, Int>, Int> = HashMap<Pair<Int, Int>, Int>()
  for (i in 0..lines.size -1) {
    for (j in 0..lines[i].length -1) {
      map.put(Pair(i, j), lines[i][j].toString().toInt())
    }
  }
  var basins: MutableList<Pair<Int, Int>> = mutableListOf()

  for (i in 0..lines.size -1) {
    for (j in 0..lines[i].length -1) {
      val value = map.getOrElse(Pair(i, j), {0})
      val left = map.getOrElse(Pair(i - 1, j), {10})
      val right = map.getOrElse(Pair(i + 1, j),{10})
      val up = map.getOrElse(Pair(i, j + 1), {10})
      val down = map.getOrElse(Pair(i, j - 1), {10})

      if (value < left && value < right && value < down && value < up) {
        basins.add(Pair(i, j))
      }
    }
  }
  val result = basins.map { getSizeBasin(it, map)}.sortedBy { -it }
  println(result[0] * result[1] * result[2])
}

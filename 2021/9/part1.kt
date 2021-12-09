import java.io.File

fun main() {
  val lines = File("input").readLines()
  val map: HashMap<Pair<Int, Int>, Int> = HashMap<Pair<Int, Int>, Int>()
  for (i in 0..lines.size -1) {
    for (j in 0..lines[i].length -1) {
      map.put(Pair(i, j), lines[i][j].toString().toInt())
    }
  }
  var total = 0

  for (i in 0..lines.size -1) {
    for (j in 0..lines[i].length -1) {
      val value = map.getOrElse(Pair(i, j), {0})
      val left = map.getOrElse(Pair(i - 1, j), {10})
      val right = map.getOrElse(Pair(i + 1, j),{10})
      val up = map.getOrElse(Pair(i, j + 1), {10})
      val down = map.getOrElse(Pair(i, j - 1), {10})

      if (value < left && value < right && value < down && value < up) {
        total += value + 1
      }
    }
  }
  println(total)
}

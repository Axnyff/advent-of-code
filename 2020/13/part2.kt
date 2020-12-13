import java.io.File

fun main() {
  val lines = File("test-data").readLines()

  val items = lines.elementAt(1).split(",")
    .mapIndexed({ index, item -> Pair(index, item)})
    .filter({ (_, item) -> item != "x"})
    .map({ (index, item) -> Pair(index, item.toInt())})


  val max = items.map( { (_, item) -> item}).maxOrNull()
  val (index, item) = items.find({ (_, item) -> item == max}) ?: Pair(0, 0)


  val start = 100000000000000
  var i = start + (start % item) - index
  while (true) {
    if (items.all( { (index, item) -> (i + index) % item == 0})) {
      break
    }
    i += item
  }
  println(i)
}

/* t = 7k */
/*   = 1 + 13k2 */
/*   = 4 + 59k3 */
/*   = 6 + 31k4 */
/*   = 7 + 19k5 */

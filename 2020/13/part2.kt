import java.io.File

fun main() {
  val lines = File("input").readLines()

  val items = lines.elementAt(1).split(",")
    .mapIndexed({ index, item -> Pair(index, item)})
    .filter({ (_, item) -> item != "x"})
    .map({ (index, item) -> Pair(index.toLong(), item.toLong())})


  var result: Long = 1
  var step: Long = 1

  for ((index, id) in items) {
    while ((result + index)% id != 0L) {
      result += step;
    }
    step *= id;
  }
  println(result);

}

/* t = 7k */
/*   = 1 + 13k2 */
/*   = 4 + 59k3 */
/*   = 6 + 31k4 */
/*   = 7 + 19k5 */

import java.io.File

fun main() {
  val lines = File("input").readLines()
  val target = lines.elementAt(0).toInt()

  val items = lines.elementAt(1).split(",").filter({ item -> item != "x"}).map({ x -> x.toInt()})

  val itemsWithMultiple = items.map({ x -> 
    Pair(x, target + x - (target % x))
  })

  val minMultiple = itemsWithMultiple.map({ (_, b) -> b}).minOrNull()

  val (id, time) = itemsWithMultiple.find({ (_, b) -> b == minMultiple}) ?: Pair (0, 0)
  println(id * (time - target))
}

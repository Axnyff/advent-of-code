import scala.io.Source
import scala.collection.mutable.HashMap
import scala.collection.mutable.Map

object Part1 {
  def rotations(point: (Int, Int, Int)): Seq[(Int, Int, Int)] = {
    val (x, y, z) = point
    return Seq(
      ( x, y, z ),
      ( y, z, x ),
      ( z, x, y ),
      ( -x, z, y ),
      ( z, y, -x ),
      ( y, -x, z ),
      ( x, z, -y ),
      ( z, -y, x ),
      ( -y, x, z ),
      ( x, -z, y ),
      ( -z, y, x ),
      ( y, x, -z ),
      ( -x, -y, z ),
      ( -y, z, -x ),
      ( z, -x, -y ),
      ( -x, y, -z ),
      ( y, -z, -x ),
      ( -z, -x, y ),
      ( x, -y, -z ),
      ( -y, -z, x ),
      ( -z, x, -y ),
      ( -x, -z, -y ),
      ( -z, -y, -x ),
      ( -y, -x, -z ),
      )
  }

  def applyTransFormation(item: (Int, Int, Int), transformation: ((Int, Int, Int), Int)): (Int, Int, Int) = {
    val ((x, y, z), index) = transformation
    val (x0, y0, z0) = rotations(item)(index)
    (x0 + x, y0 + y, z + z0)
  }

  def main(args: Array[String]) = {
    val fileContents = Source.fromFile("input").getLines.mkString("\n")

    var scanners: Seq[Seq[(Int, Int, Int)]] = fileContents.split("\n\n").map { s =>
      val items = s.split("\n").drop(1)
      items.map(item => {
        val arr = item.split(",").map(_.toInt)
        (arr(0), arr(1), arr(2))
      }).toSeq
    }.toSeq


    var i = 0
    var count = 0

    var map = scala.collection.mutable.Map[Int, Map[Int, ((Int, Int, Int), Int)]]()

    for (i <- 0 to scanners.length - 1) {
      for (j <- 0 to scanners.length -1) {
        if (i == j) {
        } else {
          val scanner = scanners(j)
          val scanner2 = scanners(j)

          val items = scanner.flatMap { item0 =>
            scanners(i).flatMap { item1 => 
              val (x, y, z) = item0
              rotations(item1).zipWithIndex.map {
                case ((x0, y0, z0), i) => {
                  (x - x0, y - y0, z - z0, i)
                }
              }
            }
          }
          val res = (items.groupBy(identity).mapValues(_.size).toSeq.filter(_._2 >= 12)).headOption.map {
            case ((x, y, z, index), count) => (((x, y, z), index))
          }
          if (res.isDefined) {
            if (i == 21) {
              println(i)
            }
            val key = (i, j)
            val index = res.get._2
            var nested = map.getOrElse(i, scala.collection.mutable.Map[Int, ((Int, Int, Int), Int)](j -> (res.get._1, index)))
            nested = nested + (j -> (res.get._1, index))
            map = map + (i -> nested)
          }
        }
      }
    }
    var allItems = scanners(0)

    def getPath(currentPath: Seq[Int]): Seq[Int] = {
      if (map.get(currentPath.last).exists(_.contains(0))) {
        return currentPath :+ 0
      }
      for (item <- map.get(currentPath.last).map(_.keys).getOrElse(Seq.empty)) {
        if (!currentPath.contains(item)) {
          val newPath = getPath(currentPath :+ item)
          if (newPath.nonEmpty) {
            return newPath
          }
        }
      }
      return Seq.empty
    }

    for (i <- 1 to scanners.length - 1) {
      val path = getPath(Seq(i))
      var pos = i
      var newItems = scanners(i)
      for (segment <- path.drop(1)) {
        val target = map.get(pos).get.get(segment).get
        pos = segment
        newItems = newItems.map(item => applyTransFormation(item, target))
      }
      allItems = allItems ++ newItems
    }

    println(allItems.distinct.length)
  }
}

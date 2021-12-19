import scala.io.Source

object Part1 {
  def rotations(point: (Int, Int, Int)): Seq[(Int, Int, Int)] = {
    val (x, y, z) = point
    return Seq(
      (x, y, z),
      (-x, -y, z),
      (-y, x, z),
      (y, -x, z),

      (-z, y, -x),
      (z, -y, -x),
      (-y, -z, -x),
      (y, z, -x),

      (-x, y, -z),
      (x, -y, -z),
      (-y, -x, -z),
      (y, x, -z),

      (z, y, -x),
      (-z, -y, -x),
      (-y, z, -x),
      (y, -z, -x),

      (x, z, -y),
      (-x, -z, -y),
      (-z, x, -y),
      (z, -x, -y),

      (x, -z , y),
      (-x, z , y),
      (z, x , y),
      (-z, -x , y),
    )
  }

  def applyTransFormation(item: (Int, Int, Int), transformation: ((Int, Int, Int), Int)): (Int, Int, Int) = {
    val (rot, index) = transformation
    val (x, y, z) = rotations(rot)(index)
    val (x0, y0, z0) = rotations(item)(index)
    (x0 + x, y0 + y, z + z0)
  }

  def main(args: Array[String]) = {
    val fileContents = Source.fromFile("test-input").getLines.mkString("\n")

    var scanners: Seq[Seq[(Int, Int, Int)]] = fileContents.split("\n\n").map { s =>
      val items = s.split("\n").drop(1)
      items.map(item => {
        val arr = item.split(",").map(_.toInt)
        (arr(0), arr(1), arr(2))
      }).toSeq
    }.toSeq

    var correctScanners = scanners.take(1)
    scanners = scanners.drop(1)

    var i = 0
    var count = 0

    while (scanners.nonEmpty) {
      for (i <- scanners.length - 1 to 0 by -1) {

        val transformation = correctScanners.flatMap { scanner =>
          val items = scanner.flatMap { item1 =>
            scanners(i).flatMap { item0 => 
              val (x0, y0, z0) = item0
              rotations(item1).zipWithIndex.map {
                case ((x, y, z), i) => {
                  if (x-x0 == -68) {
                  }
                  (x - x0, y - y0, z - z0, i)
                }
              }
            }
          }
          (items.groupBy(identity).mapValues(_.size).toSeq.filter(_._2 >= 12)).headOption.map {
            case ((x, y, z, index), count) => (((x, y, z), index), scanner)
          }
        }.headOption
        if (transformation.isDefined) {
          val allItems = transformation.get._2
          val newScanner = scanners(i).map(item => applyTransFormation(item, transformation.get._1)).sorted

          val newScannerTemp = (0 to 23).map(i => newScanner.map(item => rotations(item)(i))).sortBy(items =>
              items.filter(allItems.contains(_)).length).last.sorted
          val correctCount = newScannerTemp.filter(allItems.contains(_)).length
          if (correctCount != 0) {
            correctScanners = correctScanners :+ newScannerTemp
            scanners = scanners.take(i) ++ scanners.drop(i + 1)
            count += 1
          }

        }
      }
    }
    val allItems = correctScanners.flatten.distinct.sorted.toSeq
    println(allItems.length)


  }
}

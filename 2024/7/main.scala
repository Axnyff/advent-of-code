object Hello {
    def isPossible(obj: Long, items: Seq[Long]): Boolean = {
      if (items.length == 1) {
        return obj == items(0)
      }

      if (items.length == 2) {
        return items(0) + items(1) == obj || items(0) * items(1) == obj || s"${items(0)}${items(1)}".toLong == obj
      }

      return isPossible(obj, Seq(items(0) + items(1)) ++ items.drop(2)) || isPossible(obj, Seq(items(0) * items(1)) ++ items.drop(2)) || isPossible(obj, Seq(s"${items(0)}${items(1)}".toLong) ++ items.drop(2))
    }

    def main(args: Array[String]) = {
      val lines = scala.io.Source.fromFile("input").mkString.trim.split("\n")


      var total: Long = 0

      lines.foreach { line => {
        val splitted = line.split(": ")
        val obj = splitted(0).toLong
        val items = splitted(1).split(" ").map(_.toLong)
        if (isPossible(obj, items)) {
          total += obj
        }
      }}
      println(total)
    }
}

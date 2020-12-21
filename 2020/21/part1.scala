import scala.io.Source

object Part1 {
  def getAllergens(data: Map[String, Seq[String]]): Seq[String] = {
    var result: Map[String, String] = Map.empty
    while (data.size != result.size) {
      data.foreach { case (allergen, ingredients) => 
        val filteredIngredients = ingredients.filter(!result.contains(_))
        if (filteredIngredients.length == 1) {
          result += filteredIngredients.head -> allergen
        }
      }
    }
    return result.map(_._1).toSeq
  }

  def main(args: Array[String]): Unit = {
    val filename = "input"
    val lines = Source.fromFile(filename).getLines.toSeq

    val allIngredients = lines.flatMap { line =>
      val splitted = line.replace(")", "").split("\\(")
      splitted.head.split(" ")
    }
    val possibles: Seq[(String, Seq[String])]  = lines.flatMap { line =>
      val splitted = line.replace(")", "").split("\\(")
      val ingredients = splitted.head.split(" ")
      val allergens = splitted(1).replace("contains ", "").split(", ")

      allergens.map((_, ingredients.toSeq))
    }.toList

    val grouped: Map[String, Seq[String]] =
      possibles.groupBy(_._1).map {
        case (a, b) => (a, b.map(_._2).reduce(_.intersect(_)))
      }

    val allergens = getAllergens(grouped)
    val safeIngredientsCount = allIngredients.filter(!allergens.contains(_)).length
    println(safeIngredientsCount)
  }
}

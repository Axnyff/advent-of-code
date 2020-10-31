import Data.List

type Ingredient = [Int]

ingredients :: [Ingredient]
ingredients = 
  [[2, 0, -2, 0, 3],
   [0, 5, -3, 0, 3],
   [0, 0, 5, -1, 8],
   [0, -1, 0, 5, 8]
  ]

[ingA, ingB, ingC, ingD] = ingredients
highestScore' :: Int
highestScore' =
  let amounts = [[a, b, c, 100 - a - b - c] | a <- [0..100], b <- [0..100 -a], c <- [0..100 - a - b]]
      calculateForAmount [a, b, c, d] =
        let
          capacity = max 0 (a * ingA !! 0 + b * ingB !! 0 + c * ingC !! 0 + d * ingD !! 0)
          durability = max 0 (a * ingA !! 1 + b * ingB !! 1 + c * ingC !! 1 + d * ingD !! 1)
          flavor = max 0 (a * ingA !! 2 + b * ingB !! 2 + c * ingC !! 2 + d * ingD !! 2)
          texture = max 0 (a * ingA !! 3 + b * ingB !! 3 + c * ingC !! 3 + d * ingD !! 3)
          calories = max 0 (a * ingA !! 4 + b * ingB !! 4 + c * ingC !! 4 + d * ingD !! 4)
        in if (calories == 500) then capacity * durability * flavor * texture else 0

  in maximum (map calculateForAmount amounts)

highestScore :: Int
highestScore =
  let amounts = [[a, b, c, 100 - a - b - c] | a <- [0..100], b <- [0..100 -a], c <- [0..100 - a - b]]
      calculateForAmount [a, b, c, d] =
        let
          capacity = max 0 (a * ingA !! 0 + b * ingB !! 0 + c * ingC !! 0 + d * ingD !! 0)
          durability = max 0 (a * ingA !! 1 + b * ingB !! 1 + c * ingC !! 1 + d * ingD !! 1)
          flavor = max 0 (a * ingA !! 2 + b * ingB !! 2 + c * ingC !! 2 + d * ingD !! 2)
          texture = max 0 (a * ingA !! 3 + b * ingB !! 3 + c * ingC !! 3 + d * ingD !! 3)
        in capacity * durability * flavor * texture

  in maximum (map calculateForAmount amounts)

main = do
  putStrLn $ show $ highestScore
  putStrLn $ show $ highestScore'

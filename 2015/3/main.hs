import Data.List
import Data.Char

nextPos :: Char -> (Int, Int) -> (Int, Int)
nextPos '^' (x, y) = (x + 1, y)
nextPos 'v' (x, y) = (x - 1, y)
nextPos '>' (x, y) = (x, y + 1)
nextPos '<' (x, y) = (x, y - 1)

solvePart1 :: String -> [(Int, Int)] -> Int
solvePart1 "" list = length $ nub list
solvePart1 (char:rest) list =
  solvePart1 rest (list ++ [(nextPos char (last list))])

solvePart2 :: String -> [(Int, Int)] -> Int
solvePart2 "" list = length $ nub list
solvePart2 (char:rest) list =
  if (mod (length list) 2 == 0) then
      solvePart2 rest (list ++ [(nextPos char (last (init list)))])
  else 
      solvePart2 rest (list ++ [(nextPos char (last (init list)))])


part1 :: String -> Int
part1 str = solvePart1 str [(0, 0)]


part2 str = solvePart2 str [(0, 0), (0, 0)]

main = do
  contents <- readFile "input"
  let parsed = dropWhileEnd isSpace contents

  putStrLn $ "Part 1: " ++ (show $ part1 parsed)
  putStrLn $ "Part 2: " ++ (show $ part2 parsed)

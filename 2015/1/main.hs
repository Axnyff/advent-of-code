import Data.Char
import Data.List

solve :: String -> Int -> Int
solve "" n = n
solve ('(':rem) n = solve rem n + 1
solve (a:rem) n = solve rem n - 1

resolve str = solve str 0


solve2 :: String -> Int -> Int -> Int
solve2 str (-1) pos = pos
solve2 ('(':rem) n pos = solve2 rem (n + 1) (pos + 1)
solve2 (a:rem) n pos = solve2 rem (n - 1) (pos + 1)

resolve2 str = solve2 str 0 0

main = do
  contents <- readFile "input"
  let str = dropWhileEnd isSpace contents
  putStrLn $ "Part 1: " ++ (show $ resolve str)
  putStrLn $ "Part 2: " ++ (show $ resolve2 str)

import Data.List
import Text.Regex.Posix

forbiddenStrings :: [String]
forbiddenStrings = ["ab", "cd", "pq", "xy"]

isNice :: String -> Bool
isNice str =
  and [
    null $ filter (\x -> isInfixOf x str) forbiddenStrings,
    (length $ filter (\c -> elem c "aeiou") str) >= 3,
    not . null $ filter (\s -> length s > 1) (groupBy (==) str)
  ]


isNice' :: String -> Bool
isNice' str =
  and [
    str =~ "([a-z]{2}).*\\1",
    str =~ "([a-z]).\\1"
  ]


main = do
  fileContent <- readFile "input"
  putStrLn $ "Part 1: " ++ (show $ length $ filter isNice (lines fileContent))
  putStrLn $ "Part 2: " ++ (show $ length $ filter isNice' (lines fileContent))




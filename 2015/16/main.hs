import Text.Regex.Posix
import Data.Maybe(fromJust)
import qualified Data.HashMap.Strict as M

hashmap = M.fromList
  [
  ("children", 3),
  ("cats", 7),
  ("samoyeds", 2),
  ("pomeranians", 2),
  ("akitas", 0),
  ("vizslas", 0),
  ("goldfish", 5),
  ("trees", 3),
  ("cars", 2),
  ("perfumes", 1)]

hashmap' = M.fromList
  [
  ("children", (== 3)),
  ("cats",  (>7)),
  ("samoyeds", (== 2)),
  ("pomeranians", (< 2)),
  ("akitas", (== 0)),
  ("vizslas", (== 0)),
  ("goldfish", (< 5)),
  ("trees", (> 3)),
  ("cars", (== 2)),
  ("perfumes", (== 1))]

isValidAunt :: String -> Bool
isValidAunt aunt =
  let keys = M.keys hashmap

  in all (
    \key -> 
      not (aunt =~ key) || 
      aunt =~ (key ++ ": " ++ show (fromJust (M.lookup key hashmap)))
  ) keys


findValidAunt :: [String] -> Int -> Int
findValidAunt [] _ = -1
findValidAunt (x:xs) val = if (isValidAunt x) then val else (findValidAunt xs (val + 1))

isValidAunt' :: String -> Bool
isValidAunt' aunt =
  let keys = M.keys hashmap'

  in all (
    \key -> 
      let (_, _, _, list) = aunt =~ (key ++ ": ([0-9]+)") :: (String, String, String, [String])
      in
      not (aunt =~ key) ||
      fromJust (M.lookup key hashmap') (read (list !! 0))
  ) keys


findValidAunt' :: [String] -> Int -> Int
findValidAunt' [] _ = -1
findValidAunt' (x:xs) val = if (isValidAunt' x) then val else (findValidAunt' xs (val + 1))

main = do
  contents <- readFile "input"
  let parsedLines = lines contents
  putStrLn $ show $ findValidAunt' parsedLines 1



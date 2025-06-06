import Data.List
import Data.List.Split
import System.IO
import Data.Maybe
import qualified Data.HashMap.Strict as M

splitRule :: String -> (String, String)
splitRule input =
  let index = takeWhile (\x -> x /= ':') input
      rule = drop 1 (dropWhile (\x -> x /= ' ') input)
  in (index, rule)



doStuff :: [[String]] -> [String] -> [String]
doStuff [] acc = acc
doStuff (x:xs) acc =
  let newAcc =  [a ++ b | a <- acc, b <- x]
  in doStuff xs newAcc

resolveAlt :: M.HashMap String String -> String -> [String]
resolveAlt hashmap alt =
  let subIndexes = splitOn " " alt
      resolved = map (\index -> resolveRule hashmap index) subIndexes
  in doStuff (tail resolved) (head resolved)


resolveRule :: M.HashMap String String -> String -> [String]
resolveRule hashmap ruleId =
  let resolved = fromJust $ M.lookup ruleId hashmap
  in if isPrefixOf "\"" resolved then 
    [filter (\x -> x /= '"') resolved] else
    let alternatives = splitOn " | " resolved
    in concatMap (\alt -> resolveAlt hashmap alt) alternatives



main = do
  contents <- readFile "input"
  let rawRules = takeWhile (\x -> x /= "") $ lines contents
  let candidates = drop 1 $ dropWhile (\x -> x /= "") (lines contents)
  let hashmap = M.fromList(map splitRule rawRules)
  let validStrings = resolveRule hashmap "0"

  putStrLn $ show $ length $ filter (\x -> elem x validStrings) candidates

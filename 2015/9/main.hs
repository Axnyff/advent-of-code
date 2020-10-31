import Data.List
import qualified Data.HashMap.Strict as M
import Data.Maybe

getTravelTime _ [x] acc = acc
getTravelTime hashmap (x:y:xs) acc = getTravelTime hashmap (y:xs) acc + 
  case (M.lookup (x, y) hashmap, M.lookup (y, x) hashmap) 
    of (Just(val), _) -> val
       (_, Just(val)) -> val
       _ -> error x

parseLine :: String -> ((String, String), Int)
parseLine str =
  case (words str) of
    [x, "to", y, "=", time] -> ((x, y), read time)


main = do
  content <- readFile "input"
  let list = map parseLine (lines content)
  let cities = nub (concatMap (\a -> [fst (fst a), snd (fst a)]) list)

  let hashmap = M.fromList list


  let times = map (\permut -> getTravelTime hashmap permut 0) (permutations cities)


  putStrLn $ show $ minimum times
  putStrLn $ show $ maximum times

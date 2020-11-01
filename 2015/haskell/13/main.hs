import Data.List
import qualified Data.HashMap.Strict as M
import Data.Maybe

getTotalHappiness _ [x] acc = acc
getTotalHappiness hashmap (x:y:xs) acc = getTotalHappiness hashmap (y:xs) acc + 
  case (M.lookup (x, y) hashmap, M.lookup (y, x) hashmap) 
    of (Just(val), Just(val2)) -> val + val2
       _ -> 0

parseLine :: String -> ((String, String), Int)
parseLine str =
  case (words (filter (/= '.') str)) of
    [x, _ , gainOrLose, amount, h, u, b, s, n, t, y] -> ((x, y), if (gainOrLose == "gain") then (read amount) else -(read amount))


main = do
  content <- readFile "input"
  let list = map parseLine (lines content)
  let persons = nub (concatMap (\a -> [fst (fst a), snd (fst a)]) list)

  let hashmap = M.fromList list

  let happinesses = map (\permut -> getTotalHappiness hashmap ([last permut] ++ permut) 0) (permutations persons)


  putStrLn $ show $ maximum happinesses

  let happinesses' = map (\permut -> getTotalHappiness hashmap ([last permut] ++ permut) 0) (permutations ("Me": persons))

  putStrLn $ show $ maximum happinesses'

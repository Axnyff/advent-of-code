import qualified Data.HashMap.Strict as M
import Data.Maybe(fromMaybe, fromJust)

newState :: Bool -> Int -> (Int, Int) -> Bool
newState _ _ (0, 99)= True
newState _ _ (0, 0)= True
newState _ _ (99, 0)= True
newState _ _ (99, 99)= True
newState True x _ = x == 2 || x == 3
newState False x _ = x == 3

process :: M.HashMap (Int, Int) Bool -> Int -> M.HashMap (Int, Int) Bool
process hashmap 0 = hashmap
process hashmap n =
  let keys = M.keys hashmap
      newValue (x, y) = 
        let neighbours = sum [1 | i <- [x-1..x+1] , j <- [y-1..y+1] , (fromMaybe False (M.lookup (i, j) hashmap)) && (i,j) /= (x, y)]
            state = fromJust (M.lookup (x, y) hashmap)
        in ((x, y), newState state neighbours (x, y))
  in process (M.fromList (map newValue keys)) (n - 1)

main = do
  content <- readFile "input"
  let parsedLines = lines content
  --
  -- let parsedLines = [ "##.#.#", "...##.", "#....#", "..#...", "#.#..#", "####.#"]
  let len = length parsedLines
  let list = [((i, j), ((parsedLines !! i) !! j == '#')) | i <- [0..(len - 1)], j <- [0..(len -1)]]

  let end = process (M.fromList list) 100

  putStrLn $ show $ length $ filter id (M.elems end)

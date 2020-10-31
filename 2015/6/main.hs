import Text.Regex.Posix
import Data.Maybe
import qualified Data.HashMap.Strict as M

data Change = Toggle | TurnOn | TurnOff deriving (Eq, Show)
instance Read Change where
  readsPrec _ input =
    case input of "turn on"  -> [(TurnOn, "")]
                  "turn off" -> [(TurnOff, "")]
                  s  -> [(Toggle, "")]

type Line = (Change, (Int, Int), (Int, Int))

parseLine :: String -> Line
parseLine str =
  let (before, after, match, [change, x, y, x2, y2]) = str =~ "(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)":: (String, String, String, [String])
  in
  (read change, (read x, read y), (read x2, read y2))

initialData :: M.HashMap (Int, Int) Bool
initialData = M.fromList []

applyLine :: M.HashMap (Int, Int) Bool -> Line -> M.HashMap (Int, Int) Bool
applyLine map (TurnOn, (x1, y1), (x2, y2)) =
  M.union
    (M.fromList [((x, y), True) | x <- [x1..x2], y <- [y1..y2]])
    map
applyLine map (TurnOff, (x1, y1), (x2, y2)) =
  M.union
    (M.fromList [((x, y), False) | x <- [x1..x2], y <- [y1..y2]])
    map
applyLine map (Toggle, (x1, y1), (x2, y2)) =
  M.union
    (M.fromList [((x, y), fromMaybe True (fmap not (M.lookup (x, y) map))) | x <- [x1..x2], y <- [y1..y2]])
    map

initialData' :: M.HashMap (Int, Int) Int
initialData' = M.fromList []

applyLine' :: M.HashMap (Int, Int) Int -> Line -> M.HashMap (Int, Int) Int
applyLine' map (change, (x1, y1), (x2, y2)) =
  M.union
    (M.fromList [((x, y), fromMaybe (max 0 diff) (fmap (\x -> max 0 (x + diff)) (M.lookup (x, y) map))) | x <- [x1..x2], y <- [y1..y2]])
    map
  where diff = case change of TurnOn -> 1
                              TurnOff -> -1
                              Toggle -> 2




main = do
  content <- readFile "input"
  let parsedLines = map parseLine (lines content)
  -- let endData = foldl applyLine initialData parsedLines
  -- putStrLn $ "Part 1: " ++ (show $ length $ M.filter (== True) endData)

  let endData' = foldl applyLine' initialData' parsedLines
  putStrLn $ "Part 2: " ++ (show $ sum (M.elems endData'))

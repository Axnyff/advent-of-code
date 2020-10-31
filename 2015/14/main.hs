import Data.List
import Text.Regex.PCRE
type Reindeer = (Int, Int, Int)

calculateAdvance :: Reindeer -> Int -> Int
calculateAdvance (speed, timeSpeed, timeRest) timeRemaining =
  if (timeRemaining <= 0) then 0
  else (min timeSpeed timeRemaining) * speed + calculateAdvance (speed, timeSpeed, timeRest) (timeRemaining - timeSpeed - timeRest)

parseLine :: String -> Reindeer
parseLine str = 
  let (_, _, _, [a, b, c]) = str =~ "([0-9]+).*?([0-9]+).*?([0-9]+)" :: (String, String, String, [String])
  in
  (read a, read b, read c)

replaceNthWith :: Int -> [a] -> (a -> a) -> [a]
replaceNthWith _ [] _ = []
replaceNthWith n (x:xs) f
  | n == 0 = (f x):xs
  | otherwise = x:replaceNthWith (n-1) xs f

scoreReindeers :: [Reindeer] -> [Int]
scoreReindeers reindeers =
  foldl calculatePoints (take (length reindeers) (repeat 0)) [1..2503]
  where
    calculatePoints existingPoints time = 
      let scores = map (\r -> (calculateAdvance r time)) reindeers
          maxScore = maximum scores
          indexes = map fst (filter (\x -> snd x == maxScore) (zip [1..] scores))

      in
      foldl (\points index -> replaceNthWith index points succ) existingPoints indexes

main = do
  content <- (readFile "input")
  let reindeers = map parseLine (lines content)

  putStrLn $ show $ maximum (map (\x -> calculateAdvance x 2503) reindeers)

  putStrLn $ show $ maximum $ scoreReindeers reindeers

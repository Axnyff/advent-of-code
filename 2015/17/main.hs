import Data.List

fitContainers :: [Int] -> Int -> [Int] -> [[Int]]
fitContainers _ 0 current = [current]
fitContainers [] _ current = []
fitContainers containers target current =
  let indexedContainers = zip [0..] (filter (\v -> v <= target) containers)
      subCalcul (index, container) = 
        let (a, b) = splitAt index indexedContainers
        in fitContainers (map snd (drop 1 b)) (target - container) (current ++ [container])

  in if (length indexedContainers == 0) then [] else concatMap subCalcul indexedContainers



main = do
  let combinations = fitContainers [50, 44, 11, 49, 42, 46, 18, 32, 26, 40, 21, 7, 18, 43, 10, 47, 36, 24, 22, 40] 150 []
  putStrLn $ show $ length $ combinations
  let minContainers = minimum (map length combinations)

  putStrLn $ show $ length (filter (\x -> length x == minContainers) combinations)

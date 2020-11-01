paperNeeded :: Int -> Int -> Int -> Int
paperNeeded a b c = if a > b then paperNeeded b a c else if b > c then paperNeeded a c b else 3 * (a * b) + 2 * (a * c) + 2 * (b * c)

paperNeeded' :: Int -> Int -> Int -> Int
paperNeeded' a b c = if a > b then paperNeeded' b a c else if b > c then paperNeeded' a c b else 2 * (a + b) + a * b * c

calculateLine s =
  let [a, b, c] = wordsWhen (== 'x') s
  in
  paperNeeded (read a::Int) (read b::Int) (read c::Int)

calculateLine' s =
  let [a, b, c] = wordsWhen (== 'x') s
  in
  paperNeeded' (read a::Int) (read b::Int) (read c::Int)


wordsWhen     :: (Char -> Bool) -> String -> [String]
wordsWhen p s =  case dropWhile p s of
                      "" -> []
                      s' -> w : wordsWhen p s''
                            where (w, s'') = break p s'




main = do
  contents <- readFile "input"
  let contentLines = lines contents
  putStrLn $ show $ paperNeeded' 2 3 4
  putStrLn $ show $ paperNeeded' 1 1 10
  putStrLn $ "Part 1: " ++ (show $ foldl (\acc item -> acc + calculateLine item) 0 contentLines)
  putStrLn $ "Part 2: " ++ (show $ foldl (\acc item -> acc + calculateLine' item) 0 contentLines)

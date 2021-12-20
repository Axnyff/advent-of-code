import Data.List

divisors n = (1:) $ nub $ concat [ [x, div n x] | x <- [2..limit], rem n x == 0 ]
     where limit = (floor.sqrt.fromIntegral) n

divisors' :: Int -> [Int]

divisors' n = nub $ 
     map snd 
     (filter (\x -> (fst x) <= 50) (concat elems))
     where limit = (floor.sqrt.fromIntegral) n
           elems = [ [(x, div n x), (div n x, x)] | x <- [1..limit], rem n x == 0 ]

houses :: Int -> Int -> [(Int, Int)]
houses start end =
  map (\house -> (house, house + (sum $ divisors house))) [start..end]

houses' :: Int -> Int -> [(Int, Int)]
houses' start end =
  map (\house -> (house, (11 * (sum $ divisors' house)))) [start..end]

main = do
  -- putStrLn $ show $ fst $ head $ dropWhile (\house -> snd house < 3310000) (houses 500000 600000)
  putStrLn $ show $ fst $ head $ dropWhile (\house -> snd house < 33100000) (houses' 600000 800000)

import Data.List
canWinAgainstBoss :: (Int, Int, Int) -> (Int, Int, Int) -> Bool
canWinAgainstBoss (damage, armor, life) (damageB, armorB, lifeB) =
  let attackPlayer = max 1 (damage - armorB)
      attackBoss = max 1 (damageB - armor)

  in if (attackPlayer >= lifeB) then True
  else if (attackBoss >= life) then False
  else canWinAgainstBoss (damage, armor, life - attackBoss) (damageB, armorB, lifeB - attackPlayer)

weapons = [(8, 4, 0), (10, 5, 0), (25, 6, 0), (40, 7, 0), (74, 8, 0)]
armors = [(13, 0, 1), (31, 0, 2), (53, 0, 3), (75, 0, 4), (102, 0, 5)]
rings = [(25, 1, 0), (50, 2, 0), (100, 3, 0), (20, 0, 1), (40, 0, 2), (80, 0, 3)]

possibleEquipments :: [[(Int, Int, Int)]]
possibleEquipments =
  let possibleWeapons = map (\x -> [x]) weapons
      possibleArmors = [[]] ++ map (\x -> [x]) armors
      possibleRings = [[]] ++  map (\x -> [x]) rings ++ [[x,y] | x <- rings, y <- rings, x /= y]

  in [concat [x, y, z] | x <- possibleWeapons, y <- possibleArmors, z <- possibleRings]


getStatsFromEquipements :: [(Int, Int, Int)] -> (Int, Int, Int)
getStatsFromEquipements equipements =
  foldl (\acc  x -> case (acc, x) of ((a, b, c), (d, e, f)) -> (a + d, b + e, c + f)) (0, 0, 0) equipements

fst' (a, b, c) = a

main = do
  let stats = map getStatsFromEquipements possibleEquipments
  let winningEquipements = filter (\stat -> case stat of (_, damage, armor) -> canWinAgainstBoss (damage, armor, 100) (8, 2, 100)) stats
  let losingEquipements = filter (\stat -> case stat of (_, damage, armor) -> not $ canWinAgainstBoss (damage, armor, 100) (8, 2, 100)) stats
  let minPrice = minimum $ map fst' winningEquipements
  let maxPrice = maximum $ map fst' losingEquipements

  putStrLn $ show $ minPrice
  putStrLn $ show $ maxPrice

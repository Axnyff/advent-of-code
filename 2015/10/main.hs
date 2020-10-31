import Data.List
applyProcess :: String -> String
applyProcess str =
  concatMap (\x -> (show (length x)) ++ (take 1 x)) (groupBy (==) str)

applyProcesses str 0 = str
applyProcesses str count = applyProcesses (applyProcess str) (count - 1)

main = do
  putStrLn $ show $ length $ applyProcesses "1321131112" 40
  putStrLn $ show $ length $ applyProcesses "1321131112" 50


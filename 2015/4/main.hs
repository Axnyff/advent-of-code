import Data.List
import Data.ByteString.Lazy.UTF8 as BLU 
import Data.Digest.Pure.MD5

input = "bgvyzdsv"

findVal :: Int -> Int
findVal num =
  if isPrefixOf
    ("00000":: String)
    (show (md5 (BLU.fromString (input ++ show num)))) then num else findVal (num + 1)

findVal' :: Int -> Int
findVal' num =
  if isPrefixOf
    ("000000":: String)
    (show (md5 (BLU.fromString (input ++ show num)))) then num else findVal' (num + 1)

main :: IO ()
main = do
    putStrLn $ "Part 1: " ++ (show $ findVal 0)
    putStrLn $ "Part 2: " ++ (show $ findVal' 0)


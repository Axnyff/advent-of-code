import Data.List
import Data.ByteString.Lazy.UTF8 as BLU 
import qualified Data.ByteString as B
import Data.Digest.Pure.MD5

input = "bgvyzdsv"

-- findVal :: Int -> Int
-- findVal num =
--   if isPrefixOf
--     ("00000":: String)
--     (show (md5 ((input ++ show num):: LB.ByteString)): String) then num else findVal (num + 1)

main :: IO ()
main = do
    -- print $ findVal 0
    print $ md5 (BLU.fromString input)
    -- print $ show $ md5 ((show input ++ show 0):: LB.ByteString)


https://stackoverflow.com/questions/3232074/what-is-the-best-way-to-convert-string-to-bytestring

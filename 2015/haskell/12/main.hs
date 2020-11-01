import Data.Aeson
import Data.String.Conversions
import Data.Scientific
import Data.Maybe(fromMaybe)
import qualified Data.HashMap.Strict as M
import qualified Data.Vector as V
import qualified Data.ByteString.Lazy.UTF8 as BLU 

sumNumbers :: Value -> Int
sumNumbers (Array values) = sum (fmap sumNumbers values)
sumNumbers (Number item) = fromMaybe 0 (toBoundedInteger item)
sumNumbers (Object hashmap) = sum (fmap sumNumbers (M.elems hashmap))
sumNumbers _ = 0

sumNumbers' :: Value -> Int
sumNumbers' (Array values) = sum (fmap sumNumbers' values)
sumNumbers' (Number item) = fromMaybe 0 (toBoundedInteger item)
sumNumbers' (Object hashmap) = 
  let elems = M.elems hashmap
      isRed (String(text)) = text == cs("red")
      isRed _ = False
  in
    if any isRed (elems) then 0
    else sum (fmap sumNumbers' elems)

sumNumbers' _ = 0

main = do
  contents <- readFile "input"
  let parsed = decode (BLU.fromString contents) :: Maybe Value

  putStrLn $ show $ fmap sumNumbers' parsed

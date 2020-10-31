import Text.Regex.Posix
import Data.Function.Memoize (memoize)
import qualified Data.HashMap.Strict as M
import Text.Read(readMaybe)
import Data.Maybe(fromMaybe)
import Data.Bits((.&.), (.|.), xor, complement, shiftL, shiftR)

data Target = Number Int | Word String deriving (Show)

data Op = Set Target | And Target Target | Or Target Target | LShift Target Target | RShift Target Target | Not Target deriving (Show)


type Line = (Op, String)

parseTarget :: String -> Target
parseTarget str = 
  if str =~ "[0-9]+" then Number (read str) else Word str

parseLine :: String -> Line
parseLine str =
  case (words str) of
    [x, "->", y]               -> (Set (parseTarget x), y)
    [x, "AND", y, "->", z]     -> (And (parseTarget x) (parseTarget y), z)
    [x, "OR", y, "->", z]      -> (Or (parseTarget x) (parseTarget y), z)
    [x, "LSHIFT", y, "->", z]  -> (LShift (parseTarget x) (parseTarget y), z)
    [x, "RSHIFT", y, "->", z]  -> (RShift (parseTarget x) (parseTarget y), z)
    ["NOT", x, "->", y]        -> (Not (parseTarget x), y)

searchValue :: M.HashMap String Op -> String -> Int
searchValue hashmap key =
  memoizedLook key
  where 
    memoizedLook = memoize look
    look key = case M.lookup key hashmap 
      of Just (Set x)       -> getTarget x
         Just (And x y)     -> (.&.) (getTarget x) (getTarget y)
         Just (Or x y)      -> (.|.) (getTarget x) (getTarget y)
         Just (RShift x y)  -> shiftR (getTarget x) (getTarget y)
         Just (LShift x y)  -> shiftL (getTarget x) (getTarget y)
         Just (Not x)       -> (65535 - (getTarget x))
    getTarget (Number num) = num
    getTarget (Word word) = memoizedLook word

main :: IO()
main = do
  fileContent <- readFile "input"
  let parsedLines = map parseLine (lines fileContent)
  let result = M.fromList (map (\x -> case x of (op, target) -> (target, op)) parsedLines)
  let valueA = searchValue result "a"

  let resultBis = M.insert "b" (Set (Number valueA)) result

  putStrLn $ show $ searchValue resultBis "a"

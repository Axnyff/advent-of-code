import System.IO
import Data.Map (Map)
import qualified Data.Map as Map

getValue :: Int -> Int
getValue input
  | input >= 10 = getValue (div input 10)
  | otherwise   = input

getRemaining :: Int -> Int -> Int
getRemaining input factor =
  if (factor * 10 < input) then (getRemaining input (factor * 10)) else
  input - (getValue input) * factor


handleInstruction :: Int -> String -> Map String Int -> (Map String Int, Int)
handleInstruction x instruction store =
  let detailed = words instruction
  in case (head detailed) of
    "inp" -> (Map.insert (detailed !! 1) (getValue x) store, getRemaining x 1)
    "mul" ->
      (Map.insert
        (detailed !! 1)
        ((readValue store (detailed !! 1)) * (readValue store (detailed !! 2)))
        store,
        x
      )
    "add" ->
      (Map.insert
        (detailed !! 1)
        ((readValue store (detailed !! 1)) + (readValue store (detailed !! 2)))
        store,
        x
      )
    "div" ->
      (Map.insert
        (detailed !! 1)
        (div (readValue store (detailed !! 1)) (readValue store (detailed !! 2)))
        store,
        x
      )
    "mod" ->
      (Map.insert
        (detailed !! 1)
        (mod (readValue store (detailed !! 1)) (readValue store (detailed !! 2)))
        store,
        x
      )
    "eql" ->
      (Map.insert
        (detailed !! 1)
        (if (readValue store (detailed !! 1)) == (readValue store (detailed !! 2)) then 1 else 0)
        store,
        x
      )

readValue :: Map String Int -> String -> Int
readValue store target =
  let found = reads(target)
  in case found of
    [] -> Map.findWithDefault 0 target store
    [(val, _)] -> val

doValidate :: Int -> [String] -> Map String Int -> Int
doValidate x [] store = Map.findWithDefault 0 "z" store
doValidate x (instruction:remaining) store =
  let (newStore, newX) = handleInstruction x instruction store
  in doValidate newX remaining newStore

validate :: Int -> [String] -> Int
validate x instructions =
  doValidate x instructions Map.empty

main = do
  handle <- openFile "input" ReadMode
  contents <- hGetContents handle
  let instructions = lines contents
  -- can't evaluate this...
  let result = map  (\x -> [x, validate x instructions]) [99999999999999,99999999999998..0]

  putStrLn "FUCK"

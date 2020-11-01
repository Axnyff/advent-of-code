import Data.List
import Data.Maybe
import qualified Data.HashMap.Strict as H


replace :: String -> String -> String -> String
replace target replacement input =
  if isPrefixOf target input then replacement ++ (drop (length target) input)
  else (take 1 input) ++ replace target replacement (drop 1 input)


parseTransform :: String -> (String, String)
parseTransform str =
  let [start, _, end] = words str
  in (start, end)


handleTransform :: (String, [String]) -> String -> String -> [String]
handleTransform (key, substs) str prefix = map (\sub -> prefix ++ (replace key sub str)) substs


getTransforms :: String -> H.HashMap String [String] -> [String] -> String -> Int
getTransforms "" _ current  _ = length current
getTransforms str hashmap current pref =
  let matchingKeys = filter (\key -> (isPrefixOf key str)) $ H.keys hashmap
      newTransforms = map (\key -> (key, fromJust $ H.lookup key hashmap)) matchingKeys
      subst = concatMap (\transform -> handleTransform transform str pref) newTransforms

  in getTransforms (drop 1 str) hashmap (nub (current ++ subst)) (pref ++ (take 1 str))


main = do
  content <- readFile "input"
  let parsedLines = lines content
  let molecules = takeWhile (/= "") parsedLines
  let input = last parsedLines
  let parsed = map parseTransform molecules
  let hashmap = H.fromList (map (\group -> (fst . head $ group, map snd group)) (groupBy (\x y -> (==) (fst x) (fst y)) parsed))

  putStrLn . show $ getTransforms input hashmap [] ""

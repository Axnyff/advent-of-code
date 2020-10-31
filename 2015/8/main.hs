import Text.Regex

regexes = map mkRegex ["^\"", "\"$", "\\\\x..", "\\\\\\\\", "\""]
regexesWithResult = zip regexes ["", "", "_", "_", ""]

calculateDiff :: String -> Int
calculateDiff str =
  length str - unescapedLength str 0
  where
    unescapedLength "" acc = acc
    unescapedLength ('\"':res) acc = unescapedLength res acc
    unescapedLength ('\\':'\\':res) acc = unescapedLength res (succ acc)
    unescapedLength ('\\':'x':_:_:res) acc = unescapedLength res (succ acc)
    unescapedLength (_:res) acc = unescapedLength res (succ acc)

calculateDiff' :: String -> Int
calculateDiff' str =
  2 + escapedLength str 0 - length str
  where
    escapedLength "" acc = acc
    escapedLength ('"':xs) acc = escapedLength xs (acc + 2)
    escapedLength ('\\':xs) acc = escapedLength xs (acc + 2)
    escapedLength (_:xs)   acc =   escapedLength xs (acc + 1)


main = do
  contents <- readFile "input"
  let parsedLines = lines contents
  let result = foldl (\a b -> a + calculateDiff(b)) 0 parsedLines
  putStrLn $ show $ result
  let result' = foldl (\a b -> a + calculateDiff'(b)) 0 parsedLines
  putStrLn $ show $ result'


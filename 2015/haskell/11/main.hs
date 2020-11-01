import Data.List
import Text.Regex.Posix

nextLetter :: Char -> Char
nextLetter 'h' = 'j'
nextLetter 'n' = 'p'
nextLetter 'k' = 'm'
nextLetter char = succ char


haveThreeSucc :: String -> Bool
haveThreeSucc [x, y] = False
haveThreeSucc (x:y:z:xs) = (y == succ x && z == succ y) || haveThreeSucc((y:z:xs))

valid :: String -> Bool
valid str = str =~ "(\\w)\\1.*(\\w)\\2" && haveThreeSucc(str)

nextPassword :: String -> String
nextPassword str = 
  let removedZ = dropWhileEnd (== 'z') str
  in
    take 8 (
        (init removedZ) ++ [nextLetter (last removedZ)] ++ (repeat 'a')
    )


nextValidPassword :: String -> String
nextValidPassword pwd =
  let next = nextPassword pwd
  in
    if (valid next) then next
    else nextValidPassword next

main = do
  let part1 = nextValidPassword "hxbxwxba"
  putStrLn $ show $ part1
  putStrLn $ show $ nextValidPassword part1

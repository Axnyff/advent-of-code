(def parseLine
  [line]
  (let [match (re-matches #"x=2" line)])
    (println match))
  

(def lines
  (map parseLine (clojure.string/split (slurp test-input) #"\n")))


(println lines)


(def lines
  (clojure.string/split (slurp "test-input") #"\n"))

(def instructions
  (map
    #(map (fn [item] (let [[x y] (clojure.string/split item #",")] [(Integer/parseInt x) (Integer/parseInt y)])) (clojure.string/split % #" -> ")) lines))

(defn build-data
  [instructions data]
  (if (empty? instructions)
    data
    (let [instruction (first instruction)


(println instructions)

(def test-input (map (fn [line] (map #(Integer/parseInt (str %)) line)) (clojure.string/split (slurp "test-input") #"\n")))
(def real-input (map (fn [line] (map #(Integer/parseInt (str %)) line)) (clojure.string/split (slurp "input") #"\n")))

(def input real-input)


(defn get-col
  [index]
  (map
    (fn [row]
      (nth row index))
    input))

(defn visible?
  [value rowIndex colIndex]
  (or
    (every?
      #(< % value)
      (keep-indexed
        (fn [index value]
          (if (> index colIndex) value)) 
        (nth input rowIndex)))
    (every? 
      #(< % value)
      (keep-indexed
        (fn [index value]
          (if (< index colIndex) value)) 
        (nth input rowIndex)))
    (every? 
      #(< % value)
      (keep-indexed
        (fn [index value]
          (if (> index rowIndex) value)) 
        (get-col colIndex)))
    (every? 
      #(< % value)
      (keep-indexed
        (fn [index value]
          (if (< index rowIndex) value)) 
        (get-col colIndex)))
    ))

(defn get-nb-trees
  [coll value]
  (if (empty? coll)
    0
    (if (>= (first coll) value)
      1
      (inc (get-nb-trees (rest coll) value)))))


(defn count-nb-trees
  [value rowIndex colIndex]
  (*
    (get-nb-trees (keep-indexed
        (fn [index value]
          (if (> index colIndex) value))
        (nth input rowIndex)) value)
    (get-nb-trees
      (reverse (keep-indexed
        (fn [index value]
          (if (< index colIndex) value)) 
        (nth input rowIndex))) value)
    (get-nb-trees
      (keep-indexed
        (fn [index value]
          (if (> index rowIndex) value)) 
        (get-col colIndex)) value)
    (get-nb-trees
      (reverse 
      (keep-indexed
        (fn [index value]
          (if (< index rowIndex) value)) 
        (get-col colIndex))) value)
    ))

(def visibles
  (map-indexed
    (fn [rowIndex row]
      (map-indexed
        (fn [colIndex value]
          (visible? value rowIndex colIndex))
        row))
    input))

(def nb-trees
  (map-indexed
    (fn [rowIndex row]
      (map-indexed
        (fn [colIndex value]
          (count-nb-trees value rowIndex colIndex))
        row))
    input))

(def part1-result
  (count (filter identity (apply concat visibles))))

(def part2-result
  (apply max (apply concat nb-trees)))

(println part1-result)
(println part2-result)

(ns exo4)

(def lines (clojure.string/split (slurp "input") #"\n"))

(defn convert-range
  [item]
  (let [[start end] (clojure.string/split item #"-")]
    [(Integer/parseInt start) (Integer/parseInt end)]))


(defn fully-include
  [a b]
  (let [
        [start-a end-a] a
        [start-b end-b] b
      ]
    (or
      (and (<= start-a start-b) (>= end-a end-b))
      (and (<= start-b start-a) (>= end-b end-a))
    )))

(println (count (filter
  (fn [line]
    (let [[a b] (clojure.string/split line #",")]
      (fully-include (convert-range a) (convert-range b))))
  lines)))

(defn overlap
  [a b]
  (let [
        [start-a end-a] a
        [start-b end-b] b
      ]
    (or
      (<= start-a start-b end-a)
      (<= start-b start-a end-b)
    )))

(println (count (filter
  (fn [line]
    (let [[a b] (clojure.string/split line #",")]
      (overlap (convert-range a) (convert-range b))))
  lines)))

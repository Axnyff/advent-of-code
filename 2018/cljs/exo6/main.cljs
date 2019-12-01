(ns exo6.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn get-input
  [input-path]
  (map
    (fn [line]
      (let [[raw-x raw-y] (split line ",")]
        [(js/parseInt raw-x) (js/parseInt raw-y)]))
    (split-lines (slurp input-path))))

(def test-input (get-input "exo6/test-input"))
(def input (get-input "exo6/input"))

(defn is-bounded
  [[x y] [[min-x min-y] [max-x max-y]]]
  (and
    (< min-x x max-x)
    (< min-y y max-y)))

(defn get-boundaries
  [coll]
  [
   [
    (apply min (map first coll))
    (apply min (map second coll))]
   [
    (apply max (map first coll))
    (apply max (map second coll))]])

(defn manhattan
  [[x y] [other-x other-y]]
  (+ (Math.abs (- x other-x))
     (Math.abs (- y other-y))))

(deftest test-manhattan
  (is (= (manhattan [1, 1] [8, 3]) 9)))

(defn get-closest
  [point coll]
  (let [manhattans (map #(manhattan point %) coll)
        best (apply min manhattans)
        unique-best (= 1 (count (filter #(= best %) manhattans))) ]
    (if unique-best
      (some #(if (= best (manhattan point %)) % nil) coll)
      nil)))


(deftest test-closest
  (is (= [5 5] (get-closest [5 8] test-input))))

(deftest test-is-bounded
  (is (= [false false false true true false]
         (map #(is-bounded % (get-boundaries test-input)) test-input))))

(deftest test-boundaries
  (is (= [[1 1] [8 9]] (get-boundaries test-input))))

(defn printer
  [x]
  (println (count x) x)
  x)

(defn largest
  [factor coll]
  (let [boundaries (get-boundaries coll)
        bounded (filter #(is-bounded % boundaries) coll)
        [[min-x min-y] [max-x max-y]] boundaries]
    (->>
      (for [x (range (- min-x factor) (+ factor max-x))
            y (range (- min-y factor) (+ factor max-y))]
        (let [closest (get-closest [x y] coll)]
          (if (some #(= % closest) bounded)
            closest nil)))
      sort
      (filter some?)
      (partition-by identity)
      (map #(count %)))))

(defn part-1
  []
  (->>
    (map
      #(vector (= % %2) %)
      (largest 5 input)
      (largest 15 input))
    (filter #(= true (first % )))))

(defn do-part-2
  [input factor total]
  (let [boundaries (get-boundaries input)
        [[min-x min-y] [max-x max-y]] boundaries]
    (->>
      (for [x (range (- min-x factor) (+ factor max-x))
            y (range (- min-y factor) (+ factor max-y))]

        (apply + (map #(manhattan [x y] %) input)))
      (filter #(< % total))
      count)))


(deftest test-do-part-2
  (is (= 16 (do-part-2 test-input 100 32))))

(defn part-2
  []
  (do-part-2 input 1000 10000))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1))
    "2" (println (part-2))))

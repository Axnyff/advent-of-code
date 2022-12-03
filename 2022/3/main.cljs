(ns exo3.main
  (:require 
    [clojure.string]
    [clojure.set]))

(def raw-input (slurp "input"))

(def lines
  (map
    #(clojure.string/split % #"")
    (clojure.string/split raw-input #"\n")))


(defn compute-priority
  [item]
  (if (re-matches #"[a-z]" item)
    (+ 1 (- (int (first item)) (int \a)))
    (+ 27 (- (int (first item)) (int \A)))))

(def part1-result
  (apply
    +
  (map
    (fn [line]
      (let [[start end] (split-at (/ (count line) 2) line)]
        (compute-priority (first (clojure.set/intersection (set start) (set end)))))
      )
    lines)))

(def part2-result
  (apply 
    +
    (map
    (fn [[a b c]]
      (compute-priority (first (clojure.set/intersection (set a) (set b) (set c)))))
    (partition 3 lines))))
(println part2-result)

(ns exo2.main
  (:require 
    [clojure.string]
    [lumo.io :refer [slurp]]))

(def raw-input (slurp "input"))

(def lines
  (map
    #(clojure.string/split % " ")
    (clojure.string/split raw-input "\n")))

(def score-option
  {
  "A" 1
  "B" 2
  "C" 3
  })

(def corresp
  {"X" "A"
   "Y" "B"
   "Z" "C"
   })

(defn score-win
  [them me]
  (if (= them me)
    3
    (case [them me]
      ["A" "B"] 6
      ["A" "C"] 0
      ["B" "C"] 6
      ["B" "A"] 0
      ["C" "A"] 6
      ["C" "B"] 0)))


(def part1-scores 
  (map
    (fn [[them me]]
      [
       (get score-option (get corresp me))
       (score-win them (get corresp me))
       ]
      )
    lines))

(println (apply + (apply concat part1-scores)))

(def table
  {"A" ["B" "C"]
   "B" ["C" "A"]
   "C" ["A" "B"]
   })

(defn compute-choice
  [them option]
  (if (= option "Y")
    them
    (let [matched
          (get table them)]
      (if (= option "X")
        (nth matched 1)
        (nth matched 0)))))

(def part2-scores
  (map
    (fn [[them me]]
      [
       (get score-option (compute-choice them me))
       (score-win them (compute-choice them me))
       ]
      )
    lines))

(println (apply + (apply concat part2-scores)))

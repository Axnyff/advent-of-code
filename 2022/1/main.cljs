(ns exo1.main
  (:require 
    [clojure.string]
    [lumo.io :refer [slurp]]))

(def raw-input (slurp "input"))

(def summed-items
  (as-> raw-input content
    (clojure.string/split content "\n\n")
    (map #(map js/parseInt (clojure.string/split % "\n")) content)
    (map #(apply + %) content)))


(def part1 (apply Math.max summed-items))

(println part1)

(def part2
  (->> summed-items
   (sort)
   (reverse)
   (take 3)
   (apply +)))

(println part2)

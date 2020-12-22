(ns advent.part1
  (:require [lumo.io]
            [clojure.string]))

(def data (clojure.string/split-lines (lumo.io/slurp "test-input")))

(def deck1
  (map #(js/parseInt %) (take-while #(not= % "") (drop 1 data))))

(def deck2
  (map #(js/parseInt %) (drop 1 (drop-while #(not= % "Player 2:") data))))

(defn compute-score
  [deck]

  (apply +
    (map-indexed
      (fn [index card]
        (* (inc index) card))
      (reverse deck))))

(defn play
  [deck1 deck2]
  (cond
    (empty? deck1) (compute-score deck2)
    (empty? deck2) (compute-score deck1)
    :else
    (let [
          [card1 & rest1] deck1
          [card2 & rest2] deck2]
      (if (> card1 card2)
        (play (conj (vec rest1) card1 card2) rest2)
        (play rest1 (conj (vec rest2) card2 card1))))))

(println (play deck1 deck2))

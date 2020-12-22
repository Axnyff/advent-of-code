(ns advent.part2
  (:require [lumo.io]
            [clojure.string]))

(def data (clojure.string/split-lines (lumo.io/slurp "input")))

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
  [deck1 deck2 history]
  (cond
    (empty? deck1) [:player2 (compute-score deck2)]
    (empty? deck2) [:player1 (compute-score deck1)]
    (contains? history [deck1 deck2]) [:player1 (compute-score deck1)]
    :else
    (let [
          new-history (conj history [deck1 deck2])
          [card1 & rest1] deck1
          [card2 & rest2] deck2]
      (if
        (and
          (<= card1 (count rest1))
          (<= card2 (count rest2)))
        ;; recursive game
        (let [[winner] (play (take card1 rest1) (take card2 rest2) #{})]
          (if (= :player1 winner)
            (recur (concat rest1 [card1 card2]) rest2 new-history)
            (recur rest1 (concat rest2 [card2 card1]) new-history)))
          (if (> card1 card2)
              (recur (concat rest1 [card1 card2]) rest2 new-history)
              (recur rest1 (concat rest2 [card2 card1]) new-history))))))

(println (play deck1 deck2 #{}))

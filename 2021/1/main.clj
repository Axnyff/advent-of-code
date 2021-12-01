(ns day1
  (:refer-clojure)
  (:require [clojure.string :as str]))

(def input
  (map read-string (str/split (slurp "input") #"\n")))

(def test-input
  (map read-string (str/split (slurp "test-input") #"\n")))

(defn count-decrease
  []
  (loop [decrease-nb 0 data (rest input) current (first input)]
    (if (empty? data)
      decrease-nb
      (recur
            (if (> (first data) current) (inc decrease-nb) decrease-nb)
            (rest data)
            (first data)))))

(defn get-multi-value
  [col]
  (+ (first col) (second col) (nth col 2)))

(defn count-multi-decrease
  []
  (loop [decrease-nb 0 data input]
    (if (< (count data) 4)
      decrease-nb
      (recur
        (if (< (get-multi-value data) (get-multi-value (rest data)))
          (inc decrease-nb) decrease-nb)
            (rest data)))))

(println "Part 1: " (count-decrease))
(println "Part 2: " (count-multi-decrease))

(ns exo10.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn parse-line
  [line]
  (let [regex #"position=<((?:-| )\d+), ((?:-| )\d+)> velocity=<((?:-| )\d+), ((?:-| )\d+)>",
        result (re-find regex line)]
    [
     (js/parseInt (nth result 1))
     (js/parseInt (nth result 2))
     (js/parseInt (nth result 3))
     (js/parseInt (nth result 4))]))

(defn get-input
  [input-path]
  (map parse-line
       (split-lines (slurp input-path))))

(def input (get-input "exo10/input"))

(defn advance
  [lines seconds]
  (map
    (fn [[x y vx vy]]
      [(+ x (* vx seconds)) (+ y (* vy seconds))])
    lines))

(defn get-maxes
  [positions]
  (let [xs (map first positions)
       ys (map second positions)
       min-x (apply min xs)
       min-y (apply min ys)
       max-x (apply max xs)
       max-y (apply max ys)]
    [min-y max-y min-x max-x]))


(defn print-position
  [positions]
  (let [[min-y max-y min-x max-x] (get-maxes positions)]
    (doseq [y (range min-y (inc max-y))]
      (doseq [x (range min-x (inc max-x))]
        (if (some #(= % [x y]) positions)
          (print "*")
          (print " ")))
      (println))))

(defn part-1
  [input n]
  (print-position (advance input (js/parseInt n))))

(defn part-2
  [input])

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1 input 10418))
    "2" (println (part-2 input))))

(ns exo-11
  (:refer-clojure)
  (:require [lumo.io :refer [slurp]]
            [clojure.string :as str]

            [cljs.test :refer [deftest is run-tests]]))

(def input (.slice (slurp "input") 0 -1))

(def moves (str/split input #","))

(defn dec-h
  [a] (- a 0.5))

(defn inc-h
  [a] (+ a 0.5))

(def max-dist (atom 0)) 

(defn calc-dist
  ([moves] (reset! max-dist 0) (calc-dist moves [0, 0]))
  ([moves [x y]]
    (if (empty? moves)
      (Math.ceil (+ (Math.abs x) (Math.abs y)))
      (let [new-moves (rest moves)
            new-pos (case (first moves)
                      "ne" [(inc-h x) (inc-h y)]
                      "n" [x (inc y)]
                      "nw" [(dec-h x) (inc-h y)]
                      "sw" [(dec-h x) (dec-h y)]
                      "s" [x (dec y)]
                      "se" [(inc-h x) (dec-h y)])
            new-dist (Math.ceil (+ (Math.abs x) (Math.abs y)))
            ]

        (swap! max-dist #(if  (> new-dist %) new-dist %))
        (recur new-moves new-pos)))))

(deftest dists
  (is (= (calc-dist ["ne", "ne", "ne"]) 3))
  (is (= (calc-dist ["ne", "ne", "sw", "sw"]) 0))
  (is (= (calc-dist ["ne", "ne", "s", "s"]) 2))
  (is (= (calc-dist ["se", "sw", "se", "sw", "sw"]) 3))
     )

(defn part-1
  []
  (println (calc-dist moves)))

(defn part-2
  []
  (calc-dist moves)
  (println @max-dist))

(part-2)

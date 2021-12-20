(ns exo-13
  (:refer-clojure)
  (:require [lumo.io :refer [slurp]]
            [clojure.string :as str]
            [cljs.test :refer [deftest is run-tests]]))

(def input (.slice (slurp "input") 0 -1))

(def lines (str/split input #"\n"))

(def regex #"(\d+): (\d+)")


(defn parse-initial
  [lines]
  (reduce
    (fn [acc val]
      (let [match (re-find regex val)
            [depth range] (map int (rest match))]
        (assoc acc depth range)))
    {}
    lines))

(defn passage
  [data pos]
  (let  [length (apply max (keys data))]
    (loop [caught [] pos pos state (into {} (map #(vector % [0 1]) (keys data)))]
      (if (> pos length)
        caught
        (let [new-caught
              (if (zero? (first (get state pos)))
                (conj caught [pos (get data pos)])
                caught)
              new-state (into {} (map (fn [[depth [val dir]]]
                                        (let [new-val (+ dir val)]
                                          (if (or (zero? new-val) (= (get data depth) (inc new-val)))
                                            (vector depth [new-val (* -1 dir)])
                                            (vector depth [new-val dir])))) state))
              new-pos (inc pos)]
          (recur new-caught new-pos new-state))))))

(defn part-1
  []
  (let [ caught (passage (parse-initial lines) 0)]
    (println (apply + (map (fn [[depth range]] (* depth range)) caught)))))

(defn part-2
  []
  (let [depth (parse-initial lines)]
    (loop [pos 0]
      (if 
        (nil?
          (first 
            (filter
              (fn [[key val]]
                (zero? (mod (+ key pos) (* 2 (dec val)))))
              depth)))
        (println pos)
        (recur (inc pos))))))

(part-2)

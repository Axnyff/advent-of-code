(ns exo-24
  (:refer-clojure)
  (:require [clojure.string :refer [split]]
            [lumo.io :refer [slurp]]))

(def input
  (split (.slice (slurp "input") 0 -1) #"\n"))

(defn parse-domino
  [line]
  (map #(js/parseInt % 10) (split line #"\/")))

(def dominos
  (map parse-domino input))

(defn reducer
  [acc [a b :as domino]]
  (if (contains? acc a)
    (update acc a conj domino)
    (assoc acc a #{domino})))

(defn get-domino-map
  [dominos]
  (let [data (concat dominos (map reverse (remove (partial apply =)  dominos)))]
    (reduce reducer {} data)))

(defn chain
  [data el]
  (let [[start end] (peek el) options (get data end)]
    (if (empty? options)
      [el]
      (apply concat 
        (for [option options]
          (chain
            (assoc 
              data
              end
              (disj options option)
              (second option)
              (disj (get data (second option)) (reverse option)))
            (conj el option)))))))


(defn run
  []
  (let [data (get-domino-map dominos)]
    (apply concat (map 
      (fn [[start end :as domino]]
        (chain (assoc data start (disj (get data start) domino) end (disj (get data end) (reverse domino))) [domino]))
      (filter #(zero? (first %)) dominos)
      ))))

(defn part-1
  []
  (let [result (run)]
    (last (sort (map
      (fn [el] (apply + (apply concat el)))
      result)))))

(defn part-2
  []
  (let [result (run)]
    (last (sort (map
      (fn [el] ((juxt count (partial apply +))  (apply concat el)))
      result)))))

(println (part-2))

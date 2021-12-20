(ns exo-12
  (:refer-clojure)
  (:require [lumo.io :refer [slurp]]
            [clojure.string :as str]
            [clojure.set]))


(def input (.slice (slurp "input") 0 -1))

(def regex #"(\d+) <-> ((:?\d+,? ?)+)")

(defn get-data
  [line]
  (let [[id connect] (drop 1 (re-find regex line))]
    {id (str/split connect #", ")}))

(defn create-map
  [input]
  (reduce
    (fn [acc line]
      (merge acc (get-data line)))
    {}
    (str/split input #"\n")))

(defn get-connections
  [id data]
  (loop [connected #{id} to-check #{id} checked #{}]
    (if (empty? to-check)
      connected
      (let [connected-new
            (apply conj connected
                   (apply concat (for [id to-check]
                                   (get data id))))]
        (recur
          connected-new
          (clojure.set/difference connected checked)
          (apply conj checked to-check)
               )))))

(defn part-1
  []
  (count (get-connections "0" (create-map input))))

(defn part-2
  []
  (let [data (create-map input)
        ids (set (keys data))]
    (loop [remaining-keys ids nb-groups 0]
      (if (empty? remaining-keys)
        nb-groups
        (let [id (first remaining-keys)
              connections (get-connections id data)
              ]
          (recur (clojure.set/difference remaining-keys connections) (inc nb-groups)))))))


(println (part-2))

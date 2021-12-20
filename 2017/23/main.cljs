(ns exo-23
  (:refer-clojure)
  (:require [lumo.io :refer [slurp]]
            [clojure.string :refer [split]]))

(def input
  (mapv #(split % #" ") (split (.slice (slurp "input") 0 -1) #"\n")))

(def initial-data
  (into {} (map #(vector % 0) "abcdefgh")))

(defn get-value
  [data value]
  (if (re-matches #"[a-z]" value)
    (get data value)
    (js/parseInt value 10)))

(defn step
  [{:keys [data index mul] :as state} orders]
  (let [[type target value] (nth orders index)]
    (case type
      "set" (assoc state :data (assoc data target (get-value data value)) :index (inc index))
      "sub" (assoc state :data (assoc data target (- (get-value data target) (get-value data value))) :index (inc index))
      "mul" (assoc state :mul (inc mul) :data (assoc data target (* (get-value data target) (get-value data value))) :index (inc index))
      "jnz" (assoc state :index 
                   (if (not= (get-value data target) 0)
                     (+ (get-value data value) index)
                     (inc index))))))

(defn part-1
  [orders]
  (loop [{:keys [data index mul] :as state} {:data initial-data :index 0 :mul 0}]
    (if (contains? orders index)
      (recur (step state orders))
      mul)))


(defn prime? [n]
  (and (odd? n)
       (let [root (int (Math/sqrt n))]
         (loop [i 3]
           (or (> i root)
               (and (not (zero? (mod n i)))
                    (recur (+ i 2))))))))

(defn part-2 []
  (count (remove prime? (range 108100 125101 17))))

(println (part-2))

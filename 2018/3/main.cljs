(ns exo3.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string]
            [lumo.io]))


(defn parse-claim
  [raw-claim]
  (let [regex #"#(\d+) @ (\d+),(\d+): (\d+)x(\d+)"
        [_ id left top width height] (re-find regex raw-claim)]
    {:id id :left (js/parseInt left) :top (js/parseInt top) :width (js/parseInt width) :height (js/parseInt height)}))


(def input
  (clojure.string.split (lumo.io/slurp "exo3/input") "\n"))

(def claims
  (map parse-claim input))

(defn build-squares
  [claim]
  (let [{:keys [left top width height] } claim]
    (for [x (range left (+ left width))
          y (range top (+ top height))]
      [x y])))

(defn add-claim
  [coll claim]
  (reduce #(update % %2 inc) coll (build-squares claim)))

(defn build
  []
  (reduce #(add-claim % %2) {} claims))


(defn part-1
  []
  (let [res (build)]
    (count
      (filter
        (fn [[key val]] (< 1 val))
        res))))

(defn no-overlap
  [res claim]
  (let [squares (build-squares claim)]
    (every? #(= 1 (get res %)) squares)))

(defn part-2
  []
  (let [res (build)]
    (->> (filter #(no-overlap res %) claims)
         first
         :id)))

(defn -main
  [arg]
  (case arg
    "1" (println (part-1))
    "2" (println (part-2))))

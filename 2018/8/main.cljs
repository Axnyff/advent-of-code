(ns exo8.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn get-input
  [input-path]
  (map
    #(js/parseInt %)
    (split (slurp input-path) " ")))

(def test-input (get-input "exo8/test-input"))
(def input (get-input "exo8/input"))

(defn build-node
  [[children-count metadata-count & remaining]]
  (let
    [[children numbers]
     (reduce
       (fn [acc _]
         (let [[node new-numbers] (build-node (second acc))]
           [
            (conj (first acc) node)
            new-numbers]))
       [[] remaining]
       (range children-count))]
    [{:children children
     :metadata (take metadata-count numbers)} (drop metadata-count numbers)]))


(defn compute-metadata
  [tree]
  (let [metadata-count (apply + (:metadata tree))
        children-count (apply + (map compute-metadata (:children tree)))]
  (+ metadata-count children-count)))

(defn compute-node
  [tree]
  (let [children-node
        (map compute-node (:children tree))
        node-value
        (if (empty? children-node)
          (apply + (:metadata tree))
          (apply +
                 (map
                   #(nth children-node (dec %) 0) (:metadata tree))))]
  node-value))

(defn part-1
  [input]
  (compute-metadata (first (build-node input))))

(defn part-2
  [input]
  (compute-node (first (build-node input))))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1 input))
    "2" (println (part-2 input))))

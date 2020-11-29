(ns exo1.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string]
            [lumo.io]))

(defn do-change
  [frequency [op diff]]
  (let [func
        (cond
          (= \+ op) +
          (= \- op) -
          (= \* op) *)]
    (func frequency diff)))


(deftest test-do-change
  (is (= (do-change 30 [\+ 10]) 40))
  (is (= (do-change 30 [\- 10]) 20))
  (is (= (do-change 30 [\* 10]) 300)))

(defn do-change-with-memory
  [memory frequency change]
  (let [new-frequency 
        (do-change frequency change)
        new-memory (update memory new-frequency inc)]
    [new-memory new-frequency]))


(defn do-changes
  [frequency changes]
  (reduce #(do-change % %2) frequency changes))

(deftest test-do-changes
  (is (= (do-changes 0 [[\- 1][\- 2][\- 3]]) -6)))

(defn do-changes-with-memory
  [frequency changes]
  (reductions #(apply do-change-with-memory (conj % %2)) [{} frequency] changes))

(def raw-input (lumo.io/slurp "exo1/input"))

(def input
  (map
    (fn [[op & res]]
      [op (js/parseInt (apply str res))])
    (clojure.string.split raw-input "\n")))

(defn part1
  [input]
  (do-changes 0 input))

(defn part2
  [input]
  (->>
    (do-changes-with-memory 0 (cycle input))
    (drop-while
      (fn [[memory frequency]]
        (> 2 (get memory frequency))) ,,)
    first
    second
    ))

(defn -main
  [arg]
  (println
    (if (= "2" arg)
      (part2 input)
      (part1 input))))

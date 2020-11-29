(ns exo11.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn hundred-digit
  [n]
  (if (< n 100) 0
    (js/parseInt (nth (reverse (str n)) 2))))

(deftest test-hundred-digit
  (is (= (hundred-digit 1900) 9))
  (is (= (hundred-digit 19) 0)))

(defn calculate-cell
  [[x y] serial]
  (let [rack-id
        (+ 10 x)]
    (-> rack-id
        (* y)
        (+ serial)
        (* rack-id)
        hundred-digit
        (- 5))))

(def memo-calculate-cell (memoize calculate-cell))

(defn calculate-square
  ([coords serial] (calculate-square coords serial 3))
  ([[x y] serial square-size]
   (apply +
          (for [x (range x (+ square-size x))
                y (range y (+ square-size y))]
            (memo-calculate-cell [x y] serial)))))


(deftest test-calculate-square
  (= 29 (calculate-square [33 45] 18)))

(deftest test-calculate-cell
  (is (= (calculate-cell [3, 5] 8) 4)))

(defn part-1
  [serial]
  (apply max-key #(calculate-square % serial)
         (for [x (range 1 300)
               y (range 1 300)]
           [x y])))

(defn part-2
  [serial max-size]
  (println serial max-size)
  (doseq [size (map inc (range max-size))]
    (let [max-coords
          (apply max-key #(calculate-square % serial size)
                 (for [x (range 1 300)
                       y (range 1 300)]
                   [x y]))]
      (println [size max-coords (calculate-square max-coords serial size)]))))

(defn -main
  [arg n]
  (case arg
    "test" (run-tests)
    "1" (println (part-1 8772))
    "2" (part-2 8772 (js/parseInt n))))

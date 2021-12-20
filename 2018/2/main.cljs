(ns exo2.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string]
            [lumo.io]))

(defn count-n
  [n coll]
  (let [counted
      (->> coll
           sort
           (partition-by identity)
           (map count)
           (filter #(= % n))
           count)]
    (if
      (< 0 counted)
      1 0)))

(deftest test-count-n
  (is (= 0 (count-n 2 "abcdef")))
  (is (= 1 (count-n 2 "aabcdd")))
  (is (= 1 (count-n 3 "bababc"))))

(defn checksum
  [coll]
  (*
   (apply + (map #(count-n 2 %) coll))
   (apply + (map #(count-n 3 %) coll))))

(def test-input
  [
   "abcdef"
   "bababc"
   "abbcde"
   "abcccd"
   "aabcdd"
   "abcdee"
   "ababab"
   ])

(deftest test-checksum
  (is (= 12 (checksum test-input))))

(def input
  (clojure.string.split (lumo.io/slurp "exo2/input") "\n"))

(defn get-diff
  [coll1 coll2]
  (let [diff
        (apply str (map #(if (= %1 %2) %2 nil) coll1 coll2))]
    (if (= (count diff)
           (dec (count coll1)))
      diff
      nil)))

(defn find-diff
  []
  (let [sorted (sort input)
        length (count input)]

    (filter some?
            (concat
              (map get-diff sorted (drop 1 (cycle sorted)))
              (map get-diff sorted (drop (dec length) (cycle sorted)))))))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (checksum input))
    "2" (println (find-diff))))

(ns exo5.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string]
            [lumo.io]))

(def input
  (apply str (butlast (lumo.io/slurp "exo5/input"))))

(def uppercases
  (map char (range 65 (+ 26 65))))

(def lowercases
  (map char (range 97 (+ 26 97))))

(def combinaisons
  (let [comb (map #(str % %2) uppercases lowercases)]
    (concat comb (map (comp (partial apply str) reverse) comb))))

(defn react
  [polymer]
  (let [length (count polymer)
        new-polymer 
        (reduce
          (fn [acc comb] (.replace acc comb "")) polymer combinaisons)]
    (if (= (count new-polymer) length)
      polymer
      (recur new-polymer))))

(deftest test-react
  (is (= (react "dabAcCaCBAcCcaDA") "dabCBAcaDA")))

(defn react-without-unit
  [polymer unit]
  (->
    (clojure.string/replace polymer unit "")
    (clojure.string/replace (.toUpperCase unit) "")
    react))

(deftest test-react-with-unit
  (is (= (react-without-unit "dabAcCaCBAcCcaDA" "c") "daDA")))

(defn part-1
  []
  (count (react input)))

(defn part-2
  []
  (apply min
    (map #(count (react-without-unit input (str %))) lowercases)))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1))
    "2" (println (part-2))))

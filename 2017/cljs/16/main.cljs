(ns exo-16
  (:refer-clojure)
  (:require [cljs.test :refer [deftest is run-tests]]
            [lumo.io :refer [slurp]]
            [clojure.string :refer [split]]))

(defn spin
  [n input]
  (let [[start end] (split-at (- (count input) n) input)]
    (vec (concat end start))))

(deftest spin-test
  (is (= "deabc") (spin 3 "abcde")))


(defn exchange
  [a b input]
  (assoc (vec input) a (nth input b) b (nth input a)))

(deftest exchange-test
  (is (= "abcdef") (exchange 0 3 "dbcaef")))

(defn partner
  [a b input]
  (let [ index-a (.indexOf input a)
        index-b (.indexOf input b)]
    (exchange index-a index-b input)))

(deftest partner-test
  (is (= "abcdef") (partner \a \d "dbcaef")))

(def input
  (-> (slurp "input")
      (.slice 0 -1)
      (split ",")))

(def start "abcdefghijklmnop")

(def regex #"(x|s)(\d*)\/*(\d*)")

(defn parse-numbers
  [s]
  (let [elems (re-matches regex s)]
    [(js/parseInt (nth elems 2)) (js/parseInt (nth elems 3))]))

(defn part-1
  [start input]
  (apply str 
         (reduce
           (fn [value move]
             (if (.startsWith move "p")
               (partner (nth move 1) (nth move 3) value)
               (let [[a b] (parse-numbers move)]
                 (if (.startsWith move "x")
                   (exchange a b value)
                   (spin a value)))))
           start
           input
           )))

(deftest seq-test
  (is (= "baedc" (part-1 "abcde" ["s1", "x3/4", "pe/b"]))))

(defn part-2
  [start input]
  (loop [ nbs 1000000000 result start memory #{}]
    (if (zero? nbs)
      result
      (let [new-result
            (part-1 result input)]
        (if (contains? memory result)
          (recur (rem (dec nbs) (- 1000000000 nbs)) new-result (conj memory result))
          (recur (dec nbs) new-result (conj memory result)))))))

(println (part-2 start input))

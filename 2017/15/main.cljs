(ns exo-15
  (:refer-clojure)
  (:require [cljs.test :refer [deftest is run-tests]])
  )

(def starts [634, 301])

(def factors [16807, 48271])

(def d 2147483647)

(defn calc-bits
  [x]
  (apply str (drop 16 (.padStart (.toString x 2) 32 "0"))))

(deftest bits
  (is (= (calc-bits 1092455) "1010101101100111")))

(def d2 65536)

(defn match?
  [[a b]]
  (= (mod a d2) (mod b d2)))

(deftest matches
  (is (= true (match? [245556042 1431495498]))))

(defn next-val
  [input factor]
  (mod (* input factor) d))

(defn gen-next
  [[a b]]
  [(next-val a (nth factors 0)) (next-val  b (nth factors 1))])

(defn next-val-bis
  [input factor modulo]
  (loop [val (mod (* input factor) d)]
    (if (zero? (mod val modulo))
      val
      (recur (mod (* val factor) d)))))

(defn gen-next-bis
  [[a b]]
  [(next-val-bis a (nth factors 0) 4) (next-val-bis b (nth factors 1) 8)])


(deftest new-gen
  (is (= 1352636452 (next-val-bis 1092455 (nth factors 0) 4)))
  (is (= 1992081072 (next-val-bis 1352636452 (nth factors 0) 4)))
  )
(defn launch-test
  []
  (run-tests 'exo-15))

(defn calc-num-matches
  ([values nb-iter] (calc-num-matches values nb-iter gen-next))
  ([values nb-iter func]
  (loop [values (gen-next values) nb-matches 0 nb-iter (dec nb-iter)]
    (let [next-values (func values)
          nb-matches (if (match? values) (inc nb-matches) nb-matches)]
      (if (zero? nb-iter)
        nb-matches
        (recur next-values nb-matches (dec nb-iter)))))))

(defn part-1
  []
  (println (calc-num-matches starts 40000000)))

(defn part-2
  []
  (println (calc-num-matches starts 5000000 gen-next-bis)))

(part-2)

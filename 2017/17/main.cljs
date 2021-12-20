(ns exo-17
  (:refer-clojure)
  (:require [cljs.test :refer [deftest is run-tests]]))

(def interval 314)

(defn step
  [{:keys [pos data iter]} interval]
  (let [len (count data)
        new-pos (mod (+ pos interval) len)
        [start end] (split-at (inc new-pos) data)]
    {:data (concat start [(inc iter)] end) :pos (inc new-pos) :iter (inc iter)}))
    
(defn run
  [nb-steps interval target]
  (loop [steps 0 state {:data '(0) :iter 0 :pos 0}]
    (if (= steps nb-steps)
      (let [index (.indexOf (vec (:data state)) target)]
        (println (nth (:data state) (inc index))))
      (recur (inc steps) (step state interval)))))

(defn step-bis
  [{:keys [pos data iter]} interval]
  (let [ new-pos (mod (+ pos interval) (inc iter))
        new-data (if (zero? new-pos) (inc iter) data)]
    {:data new-data :pos (inc new-pos) :iter (inc iter)}))

(defn run-bis
  [nb-steps interval]
  (loop [steps 0 state {:data 0 :iter 0 :pos 0}]
    (if (= steps nb-steps)
      (println (:data state) )
      (recur (inc steps) (step-bis state interval)))))

(defn part-1
  []
  (run 2017 interval 2017))

(defn part-2
  []
  (run-bis 50000000 interval))

(part-2)

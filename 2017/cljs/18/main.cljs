(ns exo-18
  (:refer-clojure)
  (:require [lumo.io :refer [slurp]]
            [cljs.test :refer [deftest is run-tests]]
            [clojure.string :refer [split]]))

(def input (split (.slice (slurp "input") 0 -1) #"\n"))

(defn parse-value
  [state value]
  (if (re-matches #"[a-z]" value)
    (get state value)
    (js/parseInt value)))

(defn step
  [state order]
  (case (first order)
    "set" (assoc state (second order) (parse-value state (nth order 2)))
    "add" (assoc state (second order) (+ (get state (second order)) (parse-value state (nth order 2))))
    "mul" (assoc state (second order) (* (get state (second order)) (parse-value state (nth order 2))))
    "mod" (assoc state (second order) (mod (get state (second order)) (parse-value state (nth order 2))))))
    
(deftest test-step
  (is (= {"a" 3} (step {} ["set" "a" "3"])))
  (is (= {"a" 5} (step {"a" 0} ["add" "a" "5"])))
  (is (= {"a" 1125 "b" 15} (step {"a" 75 "b" 15} ["mul" "a" "b"])))
  (is (= {"a" 1 } (step {"a" 100} ["mod" "a" "3"])))
  )


(defn run
  [orders]
  (loop [index 0 state {} played 0]
    (let [order (nth orders index)]
      (case (first order)
        "rcv" (if (> (get state (second order)) 0) played (recur (inc index) state  played))
        "snd" (recur (inc index) state (parse-value state (second order)))
        "jgz" (recur (if (> (parse-value state (second order)) 0) (+ index (parse-value state (nth order 2))) (inc index)) state played)
        (recur (inc index) (step state order) played)))))

(deftest test-run
  (is (= 4
         (run-bis (map
                #(split % #"\s")
                ["set a 1"
                 "add a 2"
                 "mul a a"
                 "mod a 5"
                 "snd a"
                 "set a 0"
                 "rcv a"
                 "jgz a -1"
                 "set a 1"
                 "jgz a -2"]
                )))))

(defn part-1
  []
  (println (run (map #(split % #"\s") input))))

(defn run-bis
  [orders]
  (loop [index {:a 0 :b 0} state {:a {"p" 0} :b {"p" 1}} current :a other :b sent {:a 0 :b 0} queues {:a [] :b []} blocked {:a false :b false}]
    (let [order (nth orders (current index))]
      (if (= true (:a blocked) (:b blocked))
        (:b sent)
        (case (first order)
          "rcv" 
          (let [queue (other queues)]
            (if-not (zero? (count queue))
              (recur
                (update index current inc)
                (assoc state current (assoc (current state) (second order) (first queue)))
                current
                other
                sent
                (assoc queues other (vec (rest queue)))
                blocked)
              (recur index state other current sent queues (assoc blocked current true))))

        "snd"
          (recur
            (update index current inc)
            state current other
            (update sent current inc)
            (update queues current conj  (parse-value (current state) (second order)))
            (assoc blocked other false))

        "jgz"
          (let [new-index 
            (if
              (> (parse-value (current state) (second order)) 0)
              (+ (current index) (parse-value (current state) (nth order 2))) 
              (inc (current index)))]
            (recur
              (assoc index current new-index)
              state current other
              sent
              queues
              blocked))

          (recur (update index current inc )
                 (update state current #(step % order))

                 current other sent queues blocked))))))

(deftest test-run-bis
  (is (= 3
         (run-bis (map
                #(split % #"\s")
                [
"snd 1"
"snd 2"
"snd p"
"rcv a"
"rcv b"
"rcv c"
"rcv d"]
                )))))

(defn part-2
  []
  (println (run-bis (map #(split % #"\s") input))))

(part-2)

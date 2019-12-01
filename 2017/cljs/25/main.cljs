(ns exo-25
  (:refer-clojure)
  (:require [clojure.string :refer [split]]
            [lumo.io :refer [slurp]]))

(def input
  (split (.slice (slurp "input") 0 -1) #"\n"))


(defn parse-state-key
  [str]
  (second (re-find #"(\w)(:|\.)$" str)))

(defn parse-rule
  [lines]
  {:write (js/parseInt (parse-state-key (first lines)))
   :move (if (re-find #"right" (second lines)) 1 -1)
   :next-state (parse-state-key (nth lines 2))
   })

(defn parse-state-rules
  [lines]
  {:key (parse-state-key (first lines))
   :data {
          0 (parse-rule (take 3 (drop 2 lines)))
          1 (parse-rule (drop 6 lines))
          }

   })

(defn parse-input
  [input]
  (let [start-state (parse-state-key (first input))
        nb-iter (js/parseInt (second (re-find #"(\d+) steps" (second input))) 10)
        ]
    (loop [rules {} remaining (drop 3 input)]
      (if (empty? remaining)
        {:rules rules :start start-state :nb-iter nb-iter}
        (let [new-rule (parse-state-rules (take 9 remaining))]
          (recur (assoc rules (:key new-rule) (:data new-rule)) (drop 10 remaining)))))))

(defn step
  [{:keys [key nb-iter tape cursor] :as state} rules]
  (let [value (get tape cursor)
        rule (get (get rules key) value)
        new-key (:next-state rule)
        new-cursor (+ (:move rule) cursor)
        new-tape (assoc tape cursor (:write rule))
        ]
    (if (= -1 new-cursor)
      {:key new-key :nb-iter (dec nb-iter) :tape (vec (cons 0 new-tape)) :cursor 0}
      (if (= new-cursor (count tape))
        {:key new-key :nb-iter (dec nb-iter) :tape (conj new-tape 0) :cursor new-cursor}
        {:key new-key :nb-iter (dec nb-iter) :tape new-tape :cursor new-cursor}))))


(defn part-1
  []
  (let [data (parse-input input)]
    (loop [state {:key (:start data) :nb-iter (:nb-iter data) :tape [0] :cursor 0}]
      (if (zero? (:nb-iter state))
        (println (count (filter #(= 1 %) (:tape state))))
        (recur (step state (:rules data)))))))

(part-1)

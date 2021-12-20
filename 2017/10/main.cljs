(ns exo-10
  (:refer-clojure)
  (:require [cljs.test :refer (deftest is run-tests)]
            [clojure.string :as str]
            [lumo.io :refer (slurp)]))

(def input (.slice (slurp "input") 0 -1))

(def nums
  (map js/parseInt (str/split input #",")))

(def default [17, 31, 73, 47, 23])

(def ascii-nums
  (concat (map #(.charCodeAt % 0) input) default))


(defn new-state
  [{:keys [data skip position] :as state} num]
  (let [cycled (cycle data)
        len (count data)
        reversed (reverse (take num (drop position cycled)))

        regular (take (- len num) (drop (+ position  num) cycled))
        new-data (take len (drop (- len position) (cycle (concat reversed regular))))
        ]
    {:data new-data :skip (inc skip) :position (mod (+ num skip position) len)}))

(deftest new-state-test
  (is (= 
        (new-state 3 {:data (range 5) :skip 0 :position 0})
        {:data '(2 1 0 3 4) :skip 1 :position 3}))
  (is (= 
        (new-state 4 {:data '(2 1 0 3 4) :skip 1 :position 3})
        {:data '(4 3 0 1 2) :skip 2 :position 3}))
  (is (= 
        (new-state 1 {:data '(4 3 0 1 2) :skip 2 :position 3})
        {:data '(4 3 0 1 2) :skip 3 :position 1}))

  (is (= 
        (new-state 5 {:data '(4 3 0 1 2) :skip 3 :position 1})
        {:data '(3 4 2 1 0) :skip 4 :position 4}
        ))
  )

(def initial-state {:data (range 256) :skip 0 :position 0})

(defn parse
  ([nums] (reduce new-state initial-state nums))
  ([nums state] (reduce new-state state nums)))


(def rounds 64)

(defn calculate-rounds
  [ascii-nums]
  (loop [rounds rounds state initial-state]
    (if (zero? rounds)
      state
      (recur (dec rounds) (parse ascii-nums state)))))

  
(defn part-1
  [nums]
  (let [{[a b] :data} (parse nums)]
    (println (* a b))))

(defn calculate-dense-hash
  [sparse-hash]
  (map (partial apply bit-xor) (partition 16 sparse-hash)))

(defn num->hex
  [num]
  (apply str (map 
    (fn [num]
      (cond
        (> 10 num) (str num)
        true (case num
          10 "a"
          11 "b"
          12 "c"
          13 "d"
          14 "e"
          15 "f")))
    [(quot num 16) (mod num 16)])))

(defn stringify
  [dense-hash]
  (apply str (map num->hex dense-hash)))

(defn part-2
  []
  (-> (calculate-rounds ascii-nums)
    :data
    calculate-dense-hash
    stringify
    ))

(println (part-2))

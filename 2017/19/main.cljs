(ns exo-19
  (:refer-clojure)
  (:require [clojure.string :refer [split]]
            [lumo.io :refer [slurp]]
            [cljs.test :refer [deftest is run-tests]]))

(def input (split (.slice (slurp "input") 0 -1) #"\n"))

(defn get-start
  [input]
  [(.indexOf (first input) "|") 0])

(defn step
  [{:keys [dir tags]} input [x y]]
  (let [[dx dy] dir
        x (+ x dx) y (+ y dy)
        val (nth (nth input y '()) x " ")
        tags (if (re-matches #"\w" val) (conj tags val) tags)
        ]
    (if (= val "+")
      (if (= (nth (nth input (+ y dx) '()) (+ x dy) " ") " ")
        [{:dir [(- dy) (- dx)] :tags tags} [x y]]
        [{:dir [dy dx] :tags tags} [x y]])
      (if (= val " ")
        [{:tags tags :end true}]
        [{:dir dir :tags tags} [x y]]))))

(defn run
  [input]
  (let [start (get-start input)]
    (loop [state {:dir [0 1] :tags []} input input pos start nb-steps 0]
      (if (:end state)
        [(:tags state) nb-steps]
        (let [[state pos] (step state input pos)]
          (recur state input pos (inc nb-steps)))))))

(defn part-1
  []
  (println (apply str (first (run input)))))

(defn part-2
  []
  (println (second (run input))))
(part-2)

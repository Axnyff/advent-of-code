(ns exo12.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn get-input
  [input-path]
  (let [raw (split-lines (slurp input-path))
        raw-initial-state
        (drop 15 (first raw))
        initial-state
        (into {}
              (map-indexed
                #(vector % %2)
                raw-initial-state))
        transforms
        (into {} (map
                   #(vector
                      (take 5 %)
                      (nth % 9)) (drop 2 raw)))]
    {:initial-state initial-state
     :transforms transforms}))

(def test-input (get-input "exo12/test-input"))
(def input (get-input "exo12/input"))

(defn pprint
  [line]
  (doseq [[key value](sort line)]
    (print value))
  (println))

(defn score
  [line]
  (->>
    line
    (filter
      (fn [[k value]]
        (= "#" value)))
    (map first)
    (apply +)))

(defn printer
  [x]
  (println x)
  x)

(defn advance
  [state transforms]
  (let [map-key (keys state)]
    (into {}
          (->> (range (- (apply min map-key) 2)
                      (+ (apply max map-key) 3))
               (map
                 (fn [index]
                   [index
                    (get
                      transforms
                      (map
                        #(get state % ".")
                        (range (- index 2) (+ 3 index))) ".")]))
               (filter (fn [[index value]] (= value "#")))))))

(defn do-work
  [input iterations]
  (let [transforms (:transforms input)]
    (loop [state (:initial-state input) iterations iterations]
      (if (zero? iterations)
        (score state)
        (recur (advance state transforms) (dec iterations))))))

(defn part-1
  [input]
  (do-work input 20))

(defn part-2
  [input]
  (let [work-300 (do-work input 300)
        diff (- work-300
                (do-work input 200))]
    (+ work-300 (* (/ (- 50000000000 300) 100) diff))))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1 input))
    "2" (println (part-2 input))))

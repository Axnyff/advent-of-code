(ns exo-20
  (:refer-clojure)
  (:require [cljs.test :refer [deftest is run-tests]]
            [lumo.io :refer [slurp]]
            [clojure.string :refer [split]]))

(defn parse-particule
  [input]
  (let [matches (re-find #"=<(-?\d+),(-?\d+),(-?\d+)>.+?=<(-?\d+),(-?\d+),(-?\d+)>.+?(-?\d+),(-?\d+),(-?\d+)" input)
        [x y z vx vy vz ax ay az] (map #(js/parseInt % 10) (rest matches))
        ]
    {:pos [x y z] :vel [vx vy vz] :acc [ax ay az]}))


(def particules
  (map 
    parse-particule
    (split (.slice (slurp "input") 0 -1) #"\n")))


(defn sum-vect
  [[x y z] [x2 y2 z2]]
  [(+ x x2) (+ y y2) (+ z z2)])

(defn move-part
  [{:keys [pos vel acc]}]
  (let [vel (sum-vect vel acc)
        pos (sum-vect vel pos)]
    {:pos pos :vel vel :acc acc}))

(defn move-particules
  [particules]
  (map move-part particules))

(defn remove-collusions
  [particules]
  (apply 
    concat 
    (remove #(> (count %) 1)
            (vals (group-by :pos particules)))))

(defn part-distance
  [particule]
  (let [[x y z] (:pos particule)]
    (+ (Math.abs x) (Math.abs y) (Math.abs z))))

(defn part-1
  []
  (println (first (apply min-key #(part-distance (second %)) (map-indexed vector (nth (iterate move-particules particules) 1000))))))

(defn part-2
  []
  (println (count (nth (iterate #(remove-collusions (move-particules %)) particules) 500))))

(part-2)

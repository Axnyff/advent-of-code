(ns exo-22
  (:refer-clojure)
  (:require [lumo.io :refer [slurp]]
            [cljs.pprint :refer [pprint]]
            [clojure.string :refer [split]]))


(def input
  (vec (map vec (split (.slice (slurp "input") 0 -1) #"\n"))))

(defn middle-coord
  [n]
  (js/Math.floor (/ n 2)))

(def initial-pos
  [(middle-coord (count (first input))) (middle-coord (count input))])


(def initial-nodes
  (into {} (for [y (range (count input)) x (range (count (first input)))]
             [[x y] (get-in input [y x])])))
             

(defn turn-left
  [dir]
  (case dir
    [0 -1] [-1 0]
    [-1 0] [0 1]
    [0 1] [1 0]
    [1 0] [0 -1]))

(defn turn-right
  [dir]
  (nth (iterate turn-left dir) 3))
 
(defn reverse-dir
  [dir]
  (map - dir))

(defn infected?
  [nodes pos]
  (= \# (get nodes pos \.)))

(defn get-new-status
  [nodes pos]
  (case (get nodes pos \.)
    \. \W
    \W \#
    \# \F
    \F \.))

(defn update-status
  [nodes pos]
  (let [new-status (get-new-status nodes pos)]
    [(update nodes pos (constantly new-status)) (= new-status \#) new-status]))
                     

(defn update-nodes
  [nodes pos]
  (let [is-infected (infected? nodes pos) new-status (if is-infected \. \#)]
    [(update nodes pos (constantly new-status) ) (not is-infected)]))
  

(defn gen-dir
  [dir status]
  (case status
    \. (turn-left dir)
    \# (turn-right dir)
    \W dir
    \F (reverse-dir dir)))

(defn step
  [{:keys [nodes dir pos nb-infected]}]
   (let [dir (if (infected? nodes pos) (turn-right dir) (turn-left dir))
         [nodes has-infected] (update-nodes nodes pos)
         pos (map + dir pos)]
     {:nodes nodes :pos pos :dir dir :nb-infected (if has-infected (inc nb-infected) nb-infected)}))

(defn step-bis
  [{:keys [nodes dir pos nb-infected]}]
   (let [status (get nodes pos \.)
         [nodes has-infected new-status] (update-status nodes pos)
         dir (gen-dir dir status)
         new-pos (map + dir pos)
         ]
     {:nodes nodes :pos new-pos :dir dir :nb-infected (if has-infected (inc nb-infected) nb-infected)}))

(defn part-1
  [nb-iter]
  (println (:nb-infected (nth (iterate step {:nodes initial-nodes :dir [0 -1] :pos initial-pos :nb-infected 0}) nb-iter))))

(defn part-2
  [nb-iter]
  (println (:nb-infected (loop [nb-iter nb-iter state {:nodes initial-nodes :dir [0 -1] :pos initial-pos :nb-infected 0}]
    (if (zero? nb-iter)
      state
      (recur (dec nb-iter) (step-bis state)))))))

(part-2 10000000)

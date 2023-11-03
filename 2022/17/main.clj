(require 'clojure.set)

(def jet
  (cycle (butlast (slurp "input"))))

(println (count (butlast (slurp "input"))))

(defn build-rock
  [type height]
  (case type
    0 #{[2 height] [3 height] [4 height] [5 height]}
    1 #{[2 (inc height)] [3 (inc height)] [4 (inc height)] [3 height] [3 (+ 2 height)]}
    2 #{[2 height] [3 height] [4 height] [4 (inc height)] [4 (+ 2 height)]}
    3 #{[2 height] [2 (inc height)] [2 (+ 2 height)] [2 (+ 3 height)]}
    4 #{[2 height] [3 height] [2 (inc height)] [3 (inc height)]}))

(defn print-map
  [data]
  (let [max-y (apply max (map second data))]
    (doall
      (for [y (range (+ 3 max-y) -1 -1)]
        (do
          (doall
            (for [x (range 7)]
              (print (if (data [x y]) "#" "."))))
          (println "")
          )))))

(defn apply-jet
  [rock jet data]
  (let [
        new-rock 
        (into 
          #{}
          (map 
            (fn [[x y]] 
              [(if (= \> jet) (inc x) (dec x)) y]) rock))]
    (if (or
          (not (empty? (filter
                         (fn [[x y]]
                           (or
                             (< x 0)
                             (> x 6)))
                         new-rock)))
          (not (empty? (clojure.set/intersection new-rock data))))
      rock
      new-rock)))


(defn print-height
  [data]
  (inc (apply max (conj (map second data) 0))))

(defn fall-rock
  [rock data jet nums]
  (if (and (not (zero? nums)) (zero? (mod nums 1000)))
    (println (float (/ (print-height data) nums))))
  (if (= nums 50000)
    data
    (let [jet-rock (apply-jet rock (first jet) data)
          next-rock (into #{} (map (fn [[x y]] [x (dec y)]) jet-rock))]
      (if (or
            (not (empty? (filter (fn [[x y]] (> 0 y)) next-rock)))
            (not (empty? (clojure.set/intersection next-rock data))))
        (let [new-data (into #{} (filter #(< (- (print-height data) 20) (second %)) (clojure.set/union jet-rock data)))]
          (do
            (recur (build-rock (mod (inc nums) 5)
                               (+ 4 (apply max (map second new-data)))
                               ) new-data (rest jet) (inc nums))))
        (recur next-rock data (rest jet) nums)))))

(def result (fall-rock (build-rock 0 3) #{} jet 0))
(print-height result)

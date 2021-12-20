(require 'lumo.io)

(def input (.slice (lumo.io/slurp "input") 0 -1))


(defn to-int [line]
  (map #(js/parseInt % 10) line))


(defn split-lines [input]
  (.split input "\n"))

(defn split-spaces [input]
  (.split input #"\s+"))

(defn parse-input [input]
  (map
    to-int
    (map split-spaces 
       (split-lines input))))

(defn calc-checksum [lines]
  (let [maxes (map (partial apply max) lines)
        mins (map (partial apply min) lines)
        diffs (map - maxes mins)]
    (apply + diffs)))

(defn calc-checksum-new [lines]
  (apply +
    (apply concat 
           (map
              #(for [x % y % :when (and (not= x y) (zero? (mod x y)))] ( / x y ))
              lines)
            )))

(println (calc-checksum-new (parse-input input)))

(clojure.core/require 'data)
(def dirs
  [ [1 0]
    [0 1]
    [-1 0]
    [0 -1]])

(def initial
  {:dir [1 0]
   :pos [0 0]
   :stack #{}})

(defn rotate
  [curr dir]
  (let [diff (if (= dir \R) 1 3)
        index (.indexOf dirs curr) 
        new-index (+ index diff)]
    (nth (cycle dirs) new-index)))

(def moves
  (.split input ", "))
(defn convert-move
  [move]
  (let [key (first move) str-num (apply str (rest move))]
  [key (js/parseInt (apply str str-num) 10)]))

(def result
  (reduce 
    (fn [acc [key num]]
      (let [new-dir (rotate (:dir acc) key)]
        (loop [num num position (:pos acc) stack (:stack acc)]
          (if (zero? num)
            {:dir new-dir :pos position :stack stack}
            (let [new-position (map + position new-dir)]
              (if (contains? stack new-position)
                (print new-position))
                (recur (dec num) new-position (conj stack new-position)))))))
    initial
    (map convert-move moves)))

(println (:pos result))

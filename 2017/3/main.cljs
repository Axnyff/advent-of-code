(def input 325489)

(def squares (for [x (range) :when (odd? x)] (* x x)))

(defn first-square
  [input]
  (first
    (drop-while #(< % input) squares)))

(defn calc-exo1
  ( [] (calc-exo1 input))
  ( [input] 
    (let [square (first-square input)
          size (Math.sqrt square)
          real-size (/ (dec size) 2)
          offset (mod (- square input) real-size)]
      (+ real-size offset))))

(defn gen-new-dir
  [dir]
  (case dir
    [1 0] [0 1]
    [0 1] [-1 0]
    [-1 0] [0 -1]
    [0 -1] [1 0]))

(defn calc-value
  [state [x y]]
  (apply +
    (for [i (range -1 2)
          j (range -1 2)]
      (get state [(+ x i) (+ y j)] 0))))

(defn change-size?
  [[x y] size]
  (= x (- y) size))

(defn change-dir?
  [[x y] size]
  (or
    (and 
      (= size (js/Math.abs x) (js/Math.abs y))
      (not (change-size? [x y] size)))
    (and 
      (= size x)
      (= y (- 1 size)))))


(defn calc-exo2
  ([] (calc-exo2 input))
  ([input]
   (loop [state {[0 0] 1}
          dir [1 0]
          pos [0 0]
          size 0]
     (let 
       [
        new-size (if (change-size? pos size) (inc size) size)
        new-dir (if (change-dir? pos new-size) (gen-new-dir dir) dir)
        new-pos (map + new-dir pos)
        val (calc-value state new-pos)
        new-state (assoc state new-pos val)
        ]
       (if (> val input)
         new-state
         (recur new-state new-dir new-pos new-size))))))

(println (calc-exo2 325489))

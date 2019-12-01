(def input [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5])

(defn step
  [input]
  (let [max-val (apply max input)
        max-ind (.indexOf input max-val)
        len (count input)
        to-split (quot max-val len)
        offset (rem max-val len)]
    (vec (map-indexed 
      #(if (= %1 max-ind)
         to-split
         (if (<= (mod (- %1 max-ind) len) offset)
           (+ %2 1 to-split)
           (+ %2 to-split)))
      input
      ))))

(defn part-2
  ([] (part-2 input))
  ([input]
   (loop [history {} data input nb-steps 0]
     (if (or (contains? history data) (> nb-steps 13000))
       (- nb-steps (get history data))
       (let [new-data (step data)]
        (recur (assoc history data nb-steps) new-data (inc nb-steps)))))))

(defn part-1
  ([] (part-1 input))
  ([input]
   (loop [history {} data input nb-steps 0]
     (if (or (contains? history data) (> nb-steps 13000))
       nb-steps
       (let [new-data (step data)]
        (recur (assoc history data nb-steps) new-data (inc nb-steps)))))))

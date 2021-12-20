(require 'lumo.io)

(def raw-input (.slice (lumo.io/slurp "input") 0 -1))

(def input
  (mapv
    #(js/parseInt % 10)
    (clojure.string/split raw-input #"\n" )))

(defn part-1
  ([] (part-1 input))
  ([input] 
   (loop [index 0 data input num-steps 0]
     (if (>= index (count data))
       num-steps
       (let [value (nth data index)]
         (recur (+ index value) (assoc data index (inc value)) (inc num-steps)))))))


(defn part-2
  ([] (part-2 input))
  ([input] 
   (loop [index 0 data input num-steps 0]
     (if (>= index (count data))
       num-steps
       (let [value (nth data index)]
         (recur (+ index value) 
                (assoc data index (if (>= value 3) (dec value) (inc value)))
                (inc num-steps)))))))

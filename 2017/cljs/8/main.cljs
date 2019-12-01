(require 'lumo.io)
(require 'lumo.core)
(require 'clojure.string)
(require 'cljs.reader)

(def input (.slice (lumo.io/slurp "input") 0 -1))

(def lines (clojure.string/split input #"\n"))

(def instructions
  (map #(cljs.reader/read-string (str "(" % ")")) lines))

(defn test-cond
  [state instruction]
  (let [[to-check op to-compare] (drop 4 instruction)
        value (get @state to-check 0) ]
    (cond
      (= op '==) (= value to-compare)
      (= op '>) (> value to-compare)
      (= op '<) (< value to-compare)
      (= op (quote !=)) (not= value to-compare)
      (= op '>=) (>= value to-compare)
      (= op'<=) (<= value to-compare)
      true true)))

(def max-val (atom 0))

(defn handle-instruction
  [state instruction]
  (if (test-cond state instruction)
    (let [old-max-val @max-val
          operation
          (if (= (quote inc) (second instruction)) + -)]
      (swap! state update (first instruction) #(operation % (nth instruction 2)))
      (swap! max-val #(if (> (apply max (vals @state)) old-max-val) (apply max (vals @state)) old-max-val ))
      )
    ))



(defn handle-instructions
  [instructions]
  (let [state (atom {})]
    (doseq [instruction instructions] (handle-instruction state instruction))
    @state
    ))

(defn part-1
  []
  (let [data (handle-instructions instructions)]
    (println data)
    (apply max (vals data))))

(defn part-2
  []
  (handle-instructions instructions)
  @max-val)

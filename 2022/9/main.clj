(def input-file "input")

(def instructions
  (map 
    (fn [line]
      (let [[a b] (clojure.string/split line #" ")]
        [a (Integer/parseInt b)])
      )
    (clojure.string/split (slurp input-file) #"\n")))


(defn add-dir
  [[x y] dir]
  (case dir
    "U" [x (dec y)]
    "D" [x (inc y)]
    "R" [(inc x) y]
    "L" [(dec x) y]))


(defn compute-tail
  [[xH yH] [xT yT]]
  (cond
    (and (= yH yT) (= 2 (abs (- xH xT)))) [(+ xT (/ (- xH xT) 2)) yT]
    (and (= xH xT) (= 2 (abs (- yH yT)))) [xT (+ yT (/ (- yH yT) 2))]
    (= 2 (abs (- xH xT))) [(+ xT (/ (- xH xT) 2)) 
      (if (> yH yT)
        (inc yT)
        (if (= yH yT)
          yT
          (dec yT)))
                           ]
    (= 2 (abs (- yH yT))) [
      (if (> xH xT)
        (inc xT)
        (if (= xH xT)
          xT
          (dec xT)))
                           (+ yT (/ (- yH yT) 2))]
    :else [xT yT]
  ))

(defn compute-tail-2
  [[tail & remaining] acc]
   (let [new-tail (compute-tail (last acc) tail)]
     (if (empty? remaining)
       (conj acc new-tail)
     (compute-tail-2 remaining (conj acc new-tail)))))

(defn compute-rope
  [rope dir]
    (compute-tail-2 (drop 1 rope) [(add-dir (first rope) dir)]))

(defn initial-rope
  [length]
  (take length (repeat [0 0])))

(defn compute-1
  ([instructions] (compute-1 instructions {:rope (initial-rope 2) :pos #{}}))
  ([[[dir nb] & instructions] state]
   (let [new-rope (compute-rope (:rope state) dir)
         new-state {
                    :rope new-rope
                    :pos (conj (:pos state) (last new-rope))}
         new-instructions
         (if (= 1 nb) instructions (conj instructions [dir (dec nb)]))]
     (if (empty? new-instructions)
       new-state
       (recur
         new-instructions
         new-state)))))

(defn compute-2
  ([instructions] (compute-2 instructions {:rope (initial-rope 10) :pos #{}}))
  ([[[dir nb] & instructions] state]
   (let [new-rope (compute-rope (:rope state) dir)
         new-state {
                    :rope new-rope
                    :pos (conj (:pos state) (clojure.string/join "-" (last new-rope)))}
         new-instructions
         (if (= 1 nb) instructions (conj instructions [dir (dec nb)]))]
     (if (empty? new-instructions)
       new-state
       (recur
         new-instructions
         new-state)))))

(println (count (:pos (compute-1 instructions))))
(println (count (:pos (compute-2 instructions))))

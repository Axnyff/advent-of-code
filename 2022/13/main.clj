(def data
  (map (fn [[a b]]
         [(read-string a) (read-string b)])
       (map
         #(clojure.string/split % #"\n")
         (clojure.string/split (slurp "input") #"\n\n"))))

(defn compare-num
  [left right]
  (if (= left right)
    0
    (if (> left right)
      1
      -1)))

(defn emptyness
  [left right]
  (if (empty? left)
    (if (empty? right)
      0
      -1)
    (if (empty? right)
      1
      0)))

(defn is-lower
  [left right]
  (cond
    (and (number? left) (number? right))
      (compare-num left right)
    (and (sequential? left) (sequential? right))
    (loop [left left right right]
      (if (or
            (empty? left)
            (empty? right))
        (emptyness left right)
        (let [res (is-lower (first left) (first right))]
          (if (zero? res)
            (recur (rest left) (rest right))
            res))))
    (not (sequential? left))
    (is-lower [left] right)
    :else (is-lower left [right])))

(def result
  (keep-indexed
    (fn [index [left right]]
      (if (= -1 (is-lower left right))
        (inc index)))
    data
    ))

(println (apply + result))

(def divisor-packets
  #{[[2]] [[6]]})

(def sorted (sort is-lower (apply conj (apply concat data) divisor-packets)))

(println (apply *
                (keep-indexed
                  (fn [index item]
                    (if (divisor-packets item)
                      (inc index)))
                  sorted
                  )))

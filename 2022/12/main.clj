(require 'clojure.set)
(def file "input")

(def data
  (into {} (apply concat
    (map-indexed
      (fn [x line]
        (concat (map-indexed
          (fn [y c]
            [[x y] c]) line))
        )
      (clojure.string/split (slurp file) #"\n")))))

(def start
  (first (first (filter #(= (second %) \S) data))))

(def end
  (first (first (filter #(= (second %) \E) data))))

(def possible-starts
  (map first (filter #(= (second %) \a) data)))


(defn valid-step?
  [a b]
  (if (= \S a)
    (valid-step? \a b)
    (if (= \E b)
      (valid-step? a \z)
      (<= (dec (int b)) (int a)))))

(defn get-valid-neighbours
  [[x y] visited]
  (let [poss [[(inc x) y] [(dec x) y] [x (inc y)] [x (dec y)]]]
    (filter
      #(and
        (not (visited %))
        (valid-step? (get data [x y]) (get data % \|))) poss)))

(defn find-cost
  [to-visit visited cost]
   (if
     (or (empty? to-visit)
        (to-visit end))
     (if (empty? to-visit)
       ##Inf
      cost)
     (let [new-visited (clojure.set/union visited to-visit)]
     (recur
       (into #{} (mapcat #(get-valid-neighbours % new-visited) to-visit))
       new-visited
       (inc cost)))))

(println (find-cost #{start} #{} 0))

(println (apply min (map #(find-cost #{%} #{} 0) possible-starts)))

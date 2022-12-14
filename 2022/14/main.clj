(def lines
  (clojure.string/split (slurp "input") #"\n"))

(def instructions
  (map
    #(map (fn [item] (let [[x y] (clojure.string/split item #",")] [(Integer/parseInt x) (Integer/parseInt y)])) (clojure.string/split % #" -> ")) lines))

(defn get-next
  [[x1 y1] [x2 y2]]
  (if (= x1 x2)
    (if (> y1 y2)
      [x1 (dec y1)]
      [x1 (inc y1)])
    (if (> x1 x2)
      [(dec x1) y1]
      [(inc x1) y1])
      ))

(defn run-instruction
  [points data]
  (if (= 1 (count points))
    data
    (let [[a b & remaining] points]
      (if (= a b)
        (recur (concat [b] remaining) (assoc data a 1))
        (recur (concat [(get-next a b)] [b] remaining) (assoc data a 1))
      ))))

(defn build-data
  [instructions data]
  (if (empty? instructions)
    data
    (recur (rest instructions) (run-instruction (first instructions) data))))

(def data (build-data instructions {}))

(def max-y
  (apply max
    (map #(second (first %)) data)))

(def start
  [500 0])

(defn add-sand
  [data [x y]]
  (if (> y max-y)
    data
    (if (nil? (get data [x (inc y)]))
      (recur data [x (inc y)])
      (if (nil? (get data [(dec x) (inc y)]))
        (recur data [(dec x) (inc y)])
        (if (nil? (get data [(inc x) (inc y)]))
          (recur data [(inc x) (inc y)])
          (recur (assoc data [x y] 2) start))))))

(println (count (filter #(= 2 (second %)) (add-sand data start))))

(defn add-sand-2
  [data [x y]]
  (if (get data start)
    data
    (if (nil? (get data [x (inc y)]))
      (recur data [x (inc y)])
      (if (nil? (get data [(dec x) (inc y)]))
        (recur data [(dec x) (inc y)])
        (if (nil? (get data [(inc x) (inc y)]))
          (recur data [(inc x) (inc y)])
          (recur (assoc data [x y] 2) start))))))

(def data-2 (run-instruction [[-1000 (+ 2 max-y)] [1000 (+ 2 max-y)]] data))

(println (count (filter #(= 2 (second %)) (add-sand-2 data-2 start))))

(defn parseLine
  [line]
  (let [match (re-matches #"Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)" line)]
    (map #(Integer/parseInt %) (drop 1 match))))

(defn distance
  [[x y] [x2 y2]]
  (+ (abs (- x x2)) (abs (- y y2))))

(defn with-distance
  [[x y bx by]]
  [x y bx by (distance [x y] [bx by])])



(def lines
  (map (comp with-distance parseLine) (clojure.string/split (slurp "input") #"\n")))


(def min-x
  (apply min (map #(- (first %) (nth % 4)) lines)))

(def max-x
  (apply max (map #(+ (first %) (nth % 4)) lines)))

(defn count-non-beacons
  [y]
  (filter
    (fn [x]
      (not (empty?
             (filter (fn [[cx cy bx by d]]
                       (and
                          (not= [bx by] [x y])
                        (<= (distance [cx cy] [x y]) d)))
                     lines
                     )))
      )
    (for [x (range min-x (inc max-x))]
      x)))


(defn get-interval
  [y [bx by _ _2 d]]
  (let [diff-y (abs (- y by ))]
    (if (> diff-y d)
      nil
      [(- bx (- d diff-y)) (+ bx (- d diff-y))])))




(defn join-intervals
  [[[x1 x2] & remaining]]
   (if (empty? remaining)
     [x1 x2]
     (let [[[x3 x4]] remaining]
       (if (> x3 x2)
         (do
           (println x2 x3)
          nil)
         (recur (concat [[x1 (max x2 x4)]] (rest remaining)))))))


(defn find-data
  [y]
  (let [intervals (sort (filter identity (map #(get-interval y %) lines)))
        joined (join-intervals intervals)
        yolo (if (nil? joined) (println y))
        [min-x max-x] joined
        ]
    (if (and
          (<= min-x 0)
          (>= max-x 4000000))
      (recur (inc y))
      (println y))))


(def target-y 3355220)

(println (count (count-non-beacons 2000000)))

(println (+ target-y (* 3299359 4000000)))

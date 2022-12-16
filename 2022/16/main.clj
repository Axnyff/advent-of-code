(defn parse-line
  [line]
  (let [match (re-matches #"Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.*)" line)]
    [(second match) {
     :flow (Integer/parseInt (nth match 2))
     :tunnels (clojure.string/split (nth match 3) #", ")
     }]))

(defn in?
  "true if coll contains elm"
  [coll elm]
  (some #(= elm %) coll))

(def graph
  (into {} (map parse-line (clojure.string/split (slurp "input") #"\n"))))

(defn get-path
  [start end]
  (loop [visited #{} to-visit #{start} cost 0]
    (if (to-visit end)
      cost
      (recur
        (into #{} (concat visited to-visit))
        (into #{} 
          (mapcat 
            (fn [pos]
              (filter #(not (visited %)) (:tunnels (get graph pos))))
            to-visit))
        (inc cost)))))

(def to-open
  (into #{} (map first (filter #(not (zero? (:flow (second %)))) graph))))

(def positions
  (conj to-open "AA"))

(def paths
  (into {}
    (apply concat (for [x positions]
                    (for [y positions
                          :when (not= y x)]
                      [[x y] (get-path x y)])))))

(defn last-valid-path
  [path]
  (last (filter (fn [item] (not= :open item)) path)))

(def get-best-pressure
  (memoize
  (fn [t position possibles elephant]
    (apply max
      (conj (map
        (fn [possible]
          (let [travel (get paths [position possible])
                remaining (- t travel 1)]
            (+ (get-best-pressure remaining possible (disj possibles possible) elephant)
          (* remaining (:flow (get graph possible))))))
      (filter #(< (get paths [position %]) t) possibles)) 
            (if elephant
              (get-best-pressure 26 "AA" possibles false)
              0)

            )
      ))))
(println (get-best-pressure 26 "AA" to-open true))

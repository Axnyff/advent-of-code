(require 'lumo.io)
(require 'clojure.string)

(def input (.slice (lumo.io/slurp "input") 0 -1))

(def lines (clojure.string/split input #"\n"))

(def regex #"(\w+) \((\d+)\) -> ([\w, ]+)")

(def simple-regex #"(\w+) \((\d+)\)")

(defn parse-input
  [input]
  (reduce
    (fn [acc line]
      (if-let [matches (re-matches regex line)]

        (assoc acc 
               :master
               (conj (:master acc) (second matches))
               :children ((partial apply conj (:children acc) (clojure.string/split (nth matches 3) #", "))))

        acc))
    {:master #{} :children #{}}
    lines))

(defn get-line
  [prog]
  (first (filter #(.startsWith % prog) lines)))


(defn calc-struct
  [bottom]
  (let [line (get-line bottom)
        matches (re-matches regex line)
        simple-matches (re-find simple-regex line)
        weight (js/parseInt (nth simple-matches 2))
        ]
    (if-not matches
      {:weight weight :id (nth simple-matches 1)}
      (let [children
            (clojure.string/split (nth matches 3) #", ")
            children-data (map calc-struct children)
            ]
        {:id (nth matches 1) :own weight :weight (+ weight (apply + (map :weight children-data))) :children children-data}))))




(defn part-1
  [input]
  (let [data (parse-input input)]
    (first (remove
            #(contains? (:children data) %)
            (:master data)))))

(defn collect-weights
  [struct other-weight]
  (if (nil? struct)
    nil
    (let [weights (map :weight (:children struct))
          partitioned (partition-by identity (sort weights))
          [weird-weight regular-weight] (map first (sort-by count partitioned))
          data (first (filter 
                          #(= (:weight %) weird-weight)
                          (:children struct)))]
      (if (and data (< 1 (count partitioned)))
        (collect-weights data regular-weight)
          (+ (:own struct) (- other-weight (:weight struct)))))))



(defn part-2
  []
  (let [bottom (part-1 input)
        struct (calc-struct bottom)]
    (collect-weights struct 0)))

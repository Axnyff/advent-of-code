(require 'clojure.set)

(def dices
  (into #{} (map
    (fn [line]
      (map #(Integer/parseInt %) (clojure.string/split line #",")))
  (clojure.string/split (slurp "input") #"\n"))))

(defn add-side
  [pos dices]
  (if (dices pos) 0 1))

(defn count-sides
  [[x y z] dices]
  (+
    (add-side [(inc x) y z] dices)
    (add-side [(dec x) y z] dices)
    (add-side [x (inc y) z] dices)
    (add-side [x (dec y) z] dices)
    (add-side [x y (inc z)] dices)
    (add-side [x y (dec z)] dices)))

; (println (apply + (map #(count-sides % dices) dices)))

(def target
  [
   (apply max (map first dices))
   (apply max (map second dices))
   (apply max (map #(nth % 2) dices))])

(defn add-side-2
  ([start] (if (dices start) 0 (add-side-2 #{start} dices)))
  ([to-visit visited]
   (println to-visit)
   (if (to-visit target)
     1
   (let [new-to-visit
         (into #{}
               (filter #(not (visited %)) 
                       (mapcat (fn [[x y z]] 
                                 [
                                  [(inc x) y z]
                                  [(dec x) y z]
                                  [x (inc y) z]
                                  [x (dec y) z]
                                  [x y (inc z)]
                                  [x y (dec z)]
                                  ])to-visit)
                       ))]
     (if (empty? new-to-visit)
       0
       (recur new-to-visit (clojure.set/union to-visit visited)))))))

(defn count-sides-2
  [[x y z] dices]
  (+
    (add-side-2 [(inc x) y z])
    (add-side-2 [(dec x) y z] )
    (add-side-2 [x (inc y) z] )
    (add-side-2 [x (dec y) z] )
    (add-side-2 [x y (inc z)] )
    (add-side-2 [x y (dec z)] )))

(println target)
(println (apply + (map #(count-sides-2 % dices) dices)))

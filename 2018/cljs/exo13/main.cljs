(ns exo13.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn get-input
  [input-path]
  (let [lines (map-indexed vector (split-lines (slurp input-path)))]
    (reduce
      (fn [acc [line-index line]]
        (reduce
          (fn [acc [row-index c]]
            (let [
                  position [row-index line-index]
                  update-map #(update acc :map assoc position %)
                  create-wagon #(update (update acc :wagons assoc position {:dir % :turns 0})
                                         :map assoc position %2)]
              (case c
                \ acc
                \+ (update-map :inter)
                \| (update-map :vert)
                \- (update-map :horiz)
                \/ (update-map :curve-up-right)
                \\ (update-map :curve-up-left)
                \^ (create-wagon :top :vert)
                \> (create-wagon :right :horiz)
                \< (create-wagon :left :horiz)
                \v (create-wagon :bottom :vert))))
          acc
          (map-indexed vector line)))
      {:map {} :wagons {}}
      lines)))

(defn turn-left
  [dir]
  (case dir
    :right :top
    :top :left
    :bottom :right
    :left :bottom))

(defn turn-right
  [dir]
  (case dir
    :right :bottom
    :top :right
    :bottom :left
    :left :top))


(defn advance-wagon
  [[x y] {:keys [dir turns]} minimap]
  (let [new-position
        (case dir
          :top [x (dec y)]
          :left [(dec x) y]
          :right [(inc x) y]
          :bottom [x (inc y)])
        new-dir (case
              (get minimap new-position)
              :vert dir
              :horiz dir
              :curve-up-left
              (case dir
                :right :bottom
                :top :left
                :bottom :right
                :left :top)
              :curve-up-right
              (case dir
                :right :top
                :top :right
                :bottom :left
                :left :bottom)
              :inter
              (case turns
                0 (turn-left dir)
                1 dir
                2 (turn-right dir)))]
    [new-position new-dir
      (if (= :inter (get minimap new-position))
        (mod (inc turns) 3)
        turns)]))


(def test-input (get-input "exo13/test-input"))
(def test-input-2 (get-input "exo13/test-input-2"))
(def input (get-input "exo13/input"))

(defn part-1
  [input]
  (loop [data input]
    (let [sorted-wagons (sort (keys (:wagons data)))
          advanced-wagons
          (map
            (fn [wagon-position]
              (let [[new-position new-dir new-turns] (advance-wagon wagon-position (get (:wagons data) wagon-position) (:map data))
                    has-crash (not (nil? (get (:wagons data) new-position)))]
                [new-position new-dir new-turns has-crash]))
            sorted-wagons)
          crash (or
                  (some (fn [[pos _ _ has-crash]] (if has-crash pos nil)) advanced-wagons)
                  (some
                    (fn [[key val]]
                      (if (> (count val) 1)
                        key nil))
                    (group-by first advanced-wagons)))]
      (if crash
        (println crash)
        (recur (assoc data :wagons (into {} (map (fn [[pos dir turns]] [pos {:dir dir :turns turns}]) advanced-wagons))))))))

(defn part-2
  [input]
  (loop [data input]
    (let [sorted-wagons (sort (keys (:wagons data)))
          advanced-wagons
          (map-indexed
            (fn [index wagon-position]
              (let [[new-position new-dir new-turns] (advance-wagon wagon-position (get (:wagons data) wagon-position) (:map data))

                    has-crash
                    (contains?
                      (into #{} (drop (inc index) sorted-wagons))
                      new-position)]
                (if (= new-position [86 26])
                  (println has-crash wagon-position sorted-wagons))
                [new-position new-dir new-turns has-crash]))
            sorted-wagons)
          positions (into {} (map (fn [[key matching]]  [key (count matching)]) (group-by identity (map first advanced-wagons))))
          crash-positions
          (into #{} (map first 
                         (filter
                           (fn [[position _ _ has-crash]]
                             (if (= position  [86 26])
                               (println "pos" positions))
                             (if has-crash
                               (println "has crash"))
                             (or has-crash (> (get positions position) 1)))
                           advanced-wagons)))
          new-wagons
          (into {} (map (fn [[pos dir turns]] [pos {:dir dir :turns turns}])
                        (remove (fn [[position]]
                                  (contains? crash-positions position)) advanced-wagons)))]

      (if (not (empty? crash-positions))
        (println crash-positions))
      (if (>= 1 (count new-wagons))
        (println new-wagons advanced-wagons)
        (recur (assoc data :wagons new-wagons))))))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1 input))
    "2" (println (part-2 input))))

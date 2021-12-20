(ns exo9.main
  (:require [cljs.test :refer-macros [deftest is testing run-tests]]))

(defn- inner-pop [i end]
  (condp = end 
    :left  (subvec i 1)
    :right (pop i)))

(defn- inner-peek [i end]   
  (condp = end
    :left  (first i)
    :right (peek i)))

(defn- inner-push [i x end]
  (condp = end
    :left  (vec (cons x i))
    :right (conj i x)))

(def empty-deque {})

(defn dpeek [d end]
  (cond (empty? d)  nil
        (:single d) (:single d)
        :else       (inner-peek (end d) end)))

(defn dpush [d x end]
  (let [order     ({:left identity, :right reverse} end)
        other-end ({:left :right :right :left} end)]
    (cond 
      (empty? d)            {:single x}
      (:single d)           {end [x], :middle empty-deque, other-end [(:single d)]}
      (< (count (end d)) 4) (assoc d end (inner-push (end d) x end))
      :else                 (assoc d
                              end     (vec (order [x (inner-peek (end d) end)]))
                              :middle (dpush (:middle d) (inner-pop (end d) end) end)))))

(defn dpop [d end]
  (let [other-end ({:left :right :right :left} end)]
    (cond 
      (empty? d)                  d
      (:single d)                 empty-deque
      (> (count (end d)) 1)       (assoc d end (inner-pop (end d) end))
      (not (empty? (:middle d)))  (assoc d
                                    end     (dpeek (:middle d) end)
                                    :middle (dpop (:middle d) end))
      (> (count (other-end d)) 1) (assoc d
                                    end       [(inner-peek (other-end d) end)]
                                    other-end (inner-pop (other-end d) end))
      :else                       {:single (inner-peek (other-end d) end)})))

(defn rotate
  [coll n]
  (if (zero? n)
    coll
    (if (neg? n)
      (let [value (dpeek coll :left)]
        (rotate (dpush (dpop coll :left) value :right) (inc n)))
      (let [value (dpeek coll :right)]
        (rotate (dpush (dpop coll :right) value :left) (dec n))))))


(defn play-regular-marble
  [{:keys [marbles scores]} marble-value]
  {:scores scores
     :marbles (dpush (rotate marbles -1) marble-value :right)})

(defn play-23
  [{:keys [marbles scores]} marble-value player-count]
  (let [rotated-marbles (rotate marbles 8)]
    {
     :scores (update scores (mod marble-value player-count) #(+ % marble-value (dpeek rotated-marbles :left)))
     :marbles (rotate (dpop rotated-marbles :left) -1)}))

(defn printer
  [x]
  (print x)
  x)

(defn play
  [last-marble player-count]
  (->>
    (reduce
      (fn [acc marble-value]
        (let [move
              (if (zero? (mod marble-value 23))
                (play-23 acc marble-value player-count)
                (play-regular-marble acc marble-value))]
          move))
      {:marbles (dpush empty-deque 0 :left) :scores {}}
      (range 1 (inc last-marble)))
    :scores
    (map second)
    (apply max)))


(deftest test-play
  (is (= (play 25 9) 32))
  (is (= (play 6111 21) 54718)))


(defn part-1
  []
  (play 71010 468))

(defn part-2
  []
  (play (* 100 71010) 468))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1))
    "2" (println (part-2))))

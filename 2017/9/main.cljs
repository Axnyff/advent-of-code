(ns exo-9
  (:refer-clojure)
  (:require 
    [lumo.io :refer (slurp)]
    [cljs.test :refer (deftest is run-tests)]))

(def input (.slice (slurp "input") 0 -1))

(defn new-state
  [char {:keys [nb-groups escaped in-garbage nb-groups score garbage] :as state}]
  (cond
    escaped (assoc state :escaped false)
    (= \! char) (assoc state :escaped true)
    in-garbage (if (= \> char) (assoc state :in-garbage false) (assoc state :garbage (inc garbage)) )
    (= \< char) (assoc state :in-garbage true)
    (= \{ char) (assoc state :nb-groups (inc nb-groups))
    (= \} char) (assoc state :nb-groups (dec nb-groups) :score (+ score nb-groups))
    true state))

(defn parse
  [s]
  (loop [state {:nb-groups 0 :in-garbage false :score 0 :escaped false :garbage 0}  s s]
    (let [char (first s)]
      (if (empty? s)
        state
        (recur (new-state char state) (rest s))))))

(deftest parse-score
  (is (= 1 (:score (parse "{}"))))
  (is (= 6 (:score (parse "{{{}}}"))))
  (is (= 5 (:score (parse "{{},{}}"))))
  (is (= 16 (:score (parse "{{{},{},{{}}}}"))))
  (is (= 1 (:score (parse "{<a>,<a>,<a>,<a>}"))))
  (is (= 9 (:score (parse "{{<ab>},{<ab>},{<ab>},{<ab>}}"))))
  (is (= 9 (:score (parse "{{<!!>},{<!!>},{<!!>},{<!!>}}"))))
  (is (= 3 (:score (parse "{{<a!>},{<a!>},{<a!>},{<ab>}}"))))
  )

(deftest parse-garbage
  (is (= 0 (:garbage (parse "<>"))))
  (is (= 17 (:garbage (parse "<random characters>"))))
  (is (= 3 (:garbage (parse "<<<<>"))))
  (is (= 2 (:garbage (parse "<{!>}>"))))
  (is (= 0 (:garbage (parse "<!!>"))))
  (is (= 0 (:garbage (parse "<!!!>>"))))
  (is (= 10 (:garbage (parse "<{o\"i!a,<{i<a>"))))
  )

(defn part-1
  [input]
  (:score (parse input)))


(defn part-2
  [input]
  (:garbage (parse input)))

(println (part-2 input))

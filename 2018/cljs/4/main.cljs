(ns exo4.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string]
            [lumo.io]))

(def input
  (sort (clojure.string.split (lumo.io/slurp "exo4/input") "\n")))

(defn parse-line
  [raw-line]
  (let [full-line-regex #"\[(\d{4}-\d{2}-\d{2}) (\d{2}):(\d{2})\] (.+$)"
        shift-regex #"Guard #(\d+) .+"
        asleep-regex #"falls asleep"
        wakes-up-regex #"wakes up"
        [_ day raw-hours raw-minutes log] (re-find full-line-regex raw-line)
        hours (js/parseInt raw-hours)
        minutes (js/parseInt raw-minutes)
        matches-shift (re-find shift-regex log)
        matches-asleep (re-find asleep-regex log)
        matches-wakes (re-find wakes-up-regex log)
        activity
        (cond
          matches-shift [:shift (js/parseInt (get matches-shift 1))]
          matches-asleep [:asleep]
          matches-wakes [:wakes])]
    {:day day :hours hours :minutes minutes :activity activity}))

(def lines (map parse-line input))


(defn add-entry
  [{:keys [current-guard guards-data guard-start-asleep] :or { guards-data {} } :as data } {:keys [day minutes activity]}]
  (case (get activity 0)
    :shift (assoc data :current-guard (get activity 1))
    :asleep (assoc data :guard-start-asleep minutes)
    :wakes (let [guard-data (get guards-data current-guard {})
                 guard-times (get guard-data day [])]
             (assoc data :guards-data
                    (assoc guards-data current-guard
                           (assoc guard-data day
                                  (concat guard-times (range guard-start-asleep minutes))))))))
(def data
  (reduce add-entry {} lines))

(def sorted-data
  (reduce
    (fn [acc [guard-id guard-data]]
      (assoc
        acc guard-id
        (reduce
          (fn [minute-data [day minutes]]
            (reduce #(update % %2 inc) minute-data minutes))
          {}
          guard-data)))
    {}
    (:guards-data data)))

(defn part-1
  []
  (let [guard
        (apply
          max-key
          (fn [[_ data]]
            (reduce (fn [acc [key val]] (+ acc val)) 0 data)
            )
          sorted-data)]
    (* (get guard 0)
       (get (apply max-key (fn [[a b]]  b) (get guard 1)) 0))))

(defn part-2
  []
  (let [guard
        (apply
          max-key
          (fn [[_ data]]
            (apply max (vals data))
            )
          sorted-data)]
    (* (get guard 0)
       (get (apply max-key (fn [[a b]]  b) (get guard 1)) 0))))

(defn -main
  [arg]
  (case arg
    "1" (println (part-1))
    "2" (println (part-2))))

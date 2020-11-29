(ns exo7.main
  (:require [clojure.spec.alpha :as s]
            [cljs.test :refer-macros [deftest is testing run-tests]]
            [clojure.string :refer [split split-lines]]
            [clojure.data :refer [diff]]
            [lumo.io :refer [slurp]]))

(defn get-input
  [input-path]
  (map
    (fn [line]
      [(get line 5) (get line 36)])
    (split-lines (slurp input-path))))

(def test-input (get-input "exo7/test-input"))
(def input (get-input "exo7/input"))

(defn add-dep
  [{:keys [steps deps]} [required step]]
   {:steps (conj steps required step)
    :deps (update deps step conj required)})

(defn build-deps
  [steps]
  (reduce
    add-dep
    {:steps #{} :deps {}}
    steps))

(defn build-str
  [res {:keys [steps deps]}]
  (let [key (->>
              (filter
                #(empty? (get deps %)) steps)
              sort
              first)]
        (if key
          (recur
            (conj res key)
            {:steps (filter #(not= % key) steps)
             :deps (into {} (map (fn [[step needed]] [step (filter #(not= % key) needed)]) deps))})
          (apply str res))))

(def task-time 60)
(def workers-count 5)

(defn build-str-and-time
  [res {:keys [steps deps total-time workers ]}]
  (let
    [time-step
     (or (apply min
            (remove zero?
                    (map
                      (comp :remaining second)
                      workers))) 0)
     current-tasks
     (into #{} (map (comp :task second) workers))
    new-workers
    (into {} (map
               (fn [[index worker-data]]
                 [index
                  (if
                    (zero? (- (:remaining worker-data) time-step))
                    {:task nil :remaining 0 }
                    {:task (:task worker-data) :remaining (max 0 (- (:remaining worker-data) time-step))})])
                  workers))
    done-task
    (into #{}
          (remove
            (into #{} (map (comp :task second) new-workers))
            current-tasks
            ))
    new-deps (into {} (map (fn [[step needed]] [step (remove done-task needed)]) deps))
    available-tasks
    (->>
      (filter
        #(empty? (get new-deps %)) steps)
      sort)
    computed-worker-and-tasks
    (reduce
      (fn [acc task]
        (let [available-worker-index
              (first (first
                (filter
                  (fn [worker]
                    (nil? (:task (second worker))))
                  (:workers acc))))]
          (if available-worker-index
            {:tasks (conj (:tasks acc) task)
             :workers
             (into {}
                   (map (fn [worker]
                          (if (= (first worker) available-worker-index)
                            [(first worker) {:task task :remaining (+ task-time (- (.charCodeAt task 0) 64))}]
                            worker))
                        (:workers acc)
                        ))}
            acc)))
      {:tasks [] :workers new-workers}
      available-tasks)

      new-res (apply conj res (:tasks computed-worker-and-tasks))
      final-value
      {
       :workers (:workers computed-worker-and-tasks)
       :steps (remove (into #{} (:tasks computed-worker-and-tasks)) steps)
       :deps new-deps
       :total-time (+ total-time time-step)
       }
    ]
    (if-not (some #(pos? (:remaining (second %))) (:workers final-value))
      (+ total-time time-step)
      (recur new-res final-value))))


(defn part-1
  [input]
  (build-str [] (build-deps input)))

(deftest test-part-1
  (is (= (part-1 test-input) "CABDFE")))

(defn part-2
  [input]
  (build-str-and-time
    []
    (assoc
      (build-deps input)
      :total-time 0 :workers (into {} (map #(vector % {:task nil :remaining 0}) (range workers-count))))))

(defn -main
  [arg]
  (case arg
    "test" (run-tests)
    "1" (println (part-1 input))
    "2" (println (part-2 input))))

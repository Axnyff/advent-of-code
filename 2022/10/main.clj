(def file "input")

(def instructions
  (clojure.string/split (slurp file) #"\n"))

(def points #{20 60 100 140 180 220})

(defn run-instructions
  ([instructions] (run-instructions instructions 1 1))
  ([instructions x nb-cycle]
   (if (points nb-cycle)
     (println "go" (* nb-cycle x)))
   (cond
     (empty? instructions) [x nb-cycle]
     (= "noop" (first instructions)) (run-instructions (rest instructions) x (inc nb-cycle))
     (clojure.string/starts-with? (first instructions) "addx")
      (run-instructions (conj (rest instructions) (str "go" (first instructions))) x (inc nb-cycle))
     true (run-instructions (rest instructions)
                            (+ x (Integer/parseInt (subs (first instructions) 7)))
                            (+ 1 nb-cycle)
                            ))))


(defn run-instructions-2
  ([instructions] (run-instructions-2 instructions 1 1 #{}))
  ([instructions x nb-cycle data]
   (if (<= (dec x) (dec (mod nb-cycle 40)) (inc x))
     (print "#")
     (print "."))
   (if (zero? (mod nb-cycle 40)) (println ""))
   (let [new-data
         (if (<= (dec x) (mod nb-cycle 40) (inc x))
           (conj data [(inc (quot nb-cycle 40)) (mod nb-cycle 40)])
         data)
         ]
   (cond
     (empty? instructions) [new-data nb-cycle]
     (= "noop" (first instructions)) (recur (rest instructions) x (inc nb-cycle) new-data)
     (clojure.string/starts-with? (first instructions) "addx")
      (recur (conj (rest instructions) (str "go" (first instructions))) x (inc nb-cycle) new-data)
     true (recur (rest instructions)
                            (+ x (Integer/parseInt (subs (first instructions) 7)))
                            (+ 1 nb-cycle)
                            new-data
                            )))))

(def stuff (run-instructions-2 instructions))



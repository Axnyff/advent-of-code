(def test-stacks
  {
   "1" [\N \Z]
   "2" [\D \C \M]
   "3" [\P]
   })

(def stacks
  {
   "1" [\H \L \R \F \B \C \J \M]
   "2" [\D \C \Z]
   "3" [\W \G \N \C \F \J \H]
   "4" [\B \S \T \M \D \J \P]
   "5" [\J \R \D \C \N]
   "6" [\Z \G \J \P \Q \D \L \W]
   "7" [\H \R \F \T \Z \P]
   "8" [\G \M \V \L]
   "9" [\J \R \Q \F \P \G \B \C]
   }
  )

(def test-instructions
  (clojure.string/split (slurp "test-input") #"\n"))

(def instructions
  (clojure.string/split (slurp "input") #"\n"))

(defn run-instruction
  [instruction stacks]
  (let [[_ raw-nb source destination] (re-matches  #"move (\d+) from (\d+) to (\d+)" instruction)
        nb (Integer/parseInt raw-nb)
        ]
    (assoc stacks
           source (drop nb (get stacks source))
           destination (concat (reverse (take nb (get stacks source))) (get stacks destination) ))))

(defn run-instructions
  [instructions stacks]
  (if (empty? instructions)
    stacks
    (run-instructions (drop 1 instructions) (run-instruction (first instructions) stacks))))

(defn run-instruction-2
  [instruction stacks]
  (let [[_ raw-nb source destination] (re-matches  #"move (\d+) from (\d+) to (\d+)" instruction)
        nb (Integer/parseInt raw-nb)
        ]
    (assoc stacks
           source (drop nb (get stacks source))
           destination (concat (take nb (get stacks source)) (get stacks destination) ))))

(defn run-instructions-2
  [instructions stacks]
  (if (empty? instructions)
    stacks
    (run-instructions-2 (drop 1 instructions) (run-instruction-2 (first instructions) stacks))))

(def stacks-result (run-instructions instructions stacks))
(def stacks-result-2 (run-instructions-2 instructions stacks))

(println
  (clojure.string/join ""
  (map #(first (get stacks-result (str %)))
    (map inc (range 9)))))

(println
  (clojure.string/join ""
  (map #(first (get stacks-result-2 (str %)))
    (map inc (range 9)))))


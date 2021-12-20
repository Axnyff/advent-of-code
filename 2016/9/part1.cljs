(require 'data)
(defn parse-pattern
  [coll]
  (let [s (apply str coll) [nb times] (.split (.slice s 1 -1) "x")]
    [(js/parseInt nb 10) (js/parseInt times 10)]))

(defn process
  [s]
  (if-not (= (first s) \()
    (split-at 1 s)
    (let [splitted 
          (split-with 
            #(not= \) % )
            s)
          [nb times] (parse-pattern (conj (vec (first splitted)) \) ))
          [took dropped] (split-at nb (rest (last splitted)))

          ]

      [(apply concat (repeat times took)) (apply str dropped)]
      
      )))
(defn calculated
  [s]
  (loop [still s res ""]clojure
    (if (empty? still)
      res
      (let [[new-res new-still] (process still)]
        (recur new-still (apply str (concat res new-res)))))))
(def regex
  (js/RegExp. "\\s|\\n" "g"))

(def clean-input
  (.replace input regex ""))

(println (count (calculated clean-input)))

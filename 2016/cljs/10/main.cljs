(require 'data)
(defn get-lines
  [inp]
  (.split inp "\n"))

(def lines (get-lines input-2))


(defn parse-value
  [line]
  line)

(defn parse-bot
  [line]
  (let [splitted (.split line " ")
        xf true
        res (eduction  (filter #(not (js/isNaN %))) (map #(js/parseInt % 10)) splitted)
        [bot low high] (vec res)
        ]
    (println bot low high)))


(defn parse-line
  [line]
  (if (.startsWith line "bot")
    (parse-bot line)
    (parse-value line)))


(defn reducer
  [acc line]
  (let [cmd (parse-line line)]))

; (def result
;   (reduce
;     reducer
;     {:fns {} :data {}}
;     lines))

(println (parse-bot "bot 202 gives low to output 15 and high to bot 209"))

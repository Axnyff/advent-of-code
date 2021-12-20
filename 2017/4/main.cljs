(require 'lumo.io)

(def input (lumo.io/slurp "input"))

(def lines (.slice (.split input "\n") 0 -1))


(defn is-good-password
  [s]
  (not (.match s #"(\s|^)(\w+)\s.*\2(\s|$)")))

(defn part-1
  ([] (part-1 lines))
  ([lines]
   (count (filter is-good-password lines))))

(defn sort-words
  [line]
  (let [words (.split line " ")
        sorted-words (map sort words)]
    (clojure.string/join " " (map (partial apply str) sorted-words))))

(defn part-2
  ([] (part-2 lines))
  ([lines]
   (let [sorted-word
         (map sort-words lines)]
   (count (filter is-good-password sorted-word)))))

(require 'data)
(def input-1
  "allvllloooolcllclc[alldlld]abba")

(def input-2
  "allvllloooolcllclc[alldlxldaaa]abba")

(def input-3
  "bab[aba]"
  )

(defn separate-structure
  [s]
  (loop [still s squared [] normal [] is-square false]
    (if (empty? still)
      [squared normal]
      (let [char (if is-square \] \[)
            whiler #(not= % char)
            [to-add new-still] (split-with whiler still)]
        (if is-square
          (recur (rest new-still) (conj squared to-add) normal false)
          (recur (rest new-still) squared (conj normal to-add) true))))))

(def regex-tls
  (js/RegExp. "(\\w)(\\w)\\2\\1", "g"))

(def regex-ssl
  (js/RegExp. "(\\w)(\\w)\\1", "g"))

(defn test-good-match
  [s]
  (apply not= s))

(defn test-abba
  [coll]
  (let [s (apply str coll)
        
        matches (.match s regex-tls)]
    (some test-good-match matches)))

(defn test-get-all
  [s]
  (loop [still s res []]
    (if (< (count still) 3)
      res
      (if (= (first still) (nth still 2))
        (recur (drop 1 still) (conj res (vec (take 3 still))))
        (recur (rest still) res)))))

(defn get-bab-matches
  [coll]
  (apply concat (map
    (fn [chars]
        (let [s (apply str chars)]
          (remove #(apply = %)
             (test-get-all s))))
    coll)))




(defn test-tls
  [squared normal]
  (and (some test-abba normal) (not (some test-abba squared))))

(defn supports-tls
  [s]
  (let [[squared normal] (separate-structure s)]
    (test-tls squared normal)))

(defn test-ssl
  [squared normal]
  (let [s-matches (get-bab-matches squared) n-matches (get-bab-matches normal)]
    (not (empty? (filter
      (fn [s-match]
        (some
          (fn [n-match]
            (and (= (first s-match) (second n-match)) (= (second s-match) (first n-match))))
          n-matches))
      s-matches)))))


(defn supports-ssl
  [s]
  (let [[squared normal] (separate-structure s)]
    (test-ssl squared normal)))

(def lines
  (.split input "\n"))

(def result
  (count (filter supports-ssl lines)))

(println result)

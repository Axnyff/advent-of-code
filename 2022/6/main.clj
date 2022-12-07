(defn find-marker
  ([s size] (find-marker s size 0))
  ([s size total]
  (if (< (count s) size)
    -1
    (if (= size (count (set (take size s))))
      (+ total size)
      (recur (drop 1 s) size (inc total))))))

(def input (slurp "input"))

(println (find-marker input 4))
(println (find-marker input 14))

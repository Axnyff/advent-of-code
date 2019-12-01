(require 'lumo.io)
(def input (butlast (lumo.io/slurp "input")))



(def numbers
  (map 
    #(js/parseInt % 10)
    input))

(def len (count numbers))

(def offset (/ len 2))

(def offset-numbers 
  (let [infinite (cycle numbers)]
    (take len (drop offset infinite))))


(def result
  (->> (map vector numbers offset-numbers)
      (filter 
              (fn [[a b]] (= a b))
              )
      (map #(first %))
      (reduce + 0)))

(println result)

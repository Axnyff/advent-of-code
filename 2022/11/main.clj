(def test-monkeys
  {
   0 {
      :nb-inspect 0
      :items [79 98]
      :op #(* 19 %),
      :target #(if (zero? (mod % 23)) 2 3)
      }
   1 {
      :nb-inspect 0
      :items [54 65 75 74]
      :op #(+ 6 %),
      :target #(if (zero? (mod % 19)) 2 0)
      }
   2 {
      :nb-inspect 0
      :items [79 60 97]
      :op #(* % %),
      :target #(if (zero? (mod % 13)) 1 3)
      }
   3 {
      :nb-inspect 0
      :items [74]
      :op #(+ 3 %),
      :target #(if (zero? (mod % 17)) 0 1)
      }
   }
  )

(def lcm (* 17 13 19 23))
(def lcm (* 7 19 13 3 5 17 11 2))

(def monkeys
  {
   0 {
      :nb-inspect 0
      :items [93 54 69 66 71]
      :op #(* 3 %)
      :target #(if (zero? (mod % 7)) 7 1)
      }
   1 {
      :nb-inspect 0
      :items [89 51 80 66]
      :op #(* 17 %)
      :target #(if (zero? (mod % 19)) 5 7)
      }
   2 {
      :nb-inspect 0
      :items [90 92 63 91 96 63 64]
      :op #(+ 1 %)
      :target #(if (zero? (mod % 13)) 4 3)
      }
   3 {
      :nb-inspect 0
      :items [65 77]
      :op #(+ 2 %),
      :target #(if (zero? (mod % 3)) 4 6)
      }
   4 {
      :nb-inspect 0
      :items [76 68 94]
      :op #(* % %),
      :target #(if (zero? (mod % 2)) 0 6)
      }
   5 {
      :nb-inspect 0
      :items [86 65 66 97 73 83]
      :op #(+ 8 %),
      :target #(if (zero? (mod % 11)) 2 3)
      }
   6 {
      :nb-inspect 0
      :items [78]
      :op #(+ 6 %),
      :target #(if (zero? (mod % 17)) 0 1)
      }
   7 {
      :nb-inspect 0
      :items [89 57 59 61 87 55 55 88]
      :op #(+ 7 %),
      :target #(if (zero? (mod % 5)) 2 5)
      }
   }
  )



(defn handle-item
  [item monkey]
  (let [new-item ((:op monkey) (mod item lcm))]
    [((:target monkey) new-item) new-item]))

(defn do-monkey
  [monkeys monkey-index]
  (let [monkey (get monkeys monkey-index)
        other-monkeys (dissoc monkeys monkey-index)
        new-items (map #(handle-item % monkey) (:items monkey))
        new-items-map (into {} (map (fn [[index data]] [index (map second data)]) (group-by first new-items)))
        ]
    (assoc
      (into {}
            (map
              (fn [[index monkey]]
                [index (assoc monkey
                              :items 
                              (concat (:items monkey)
                                (get new-items-map index)))
                 ]
                ) other-monkeys))
      monkey-index
      (assoc monkey :items (get new-items-map monkey-index) :nb-inspect (+ (:nb-inspect monkey) (count new-items)))
  )))

(defn do-round
  [monkeys round-index monkey-index]
  (if (= round-index 10000)
    monkeys
    (if (= monkey-index (count monkeys))
      (recur monkeys (inc round-index) 0)
      (recur (do-monkey monkeys monkey-index) round-index (inc monkey-index)))))

(def raw-result (do-round monkeys 0 0))
(def result (sort-by - (map (fn [[index data]] (:nb-inspect data)) raw-result)))

(println (* (first result) (second result)))

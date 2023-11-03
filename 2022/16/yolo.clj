(def fib (memoize 
           (fn 
             ([x] (recur x 0)
             ([x current] (if (< x 2) x
                              (recur (- x 1) (recur (- x 2)))))
             )))
(time (fib 2000))

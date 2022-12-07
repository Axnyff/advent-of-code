(def test-input
  (drop 1 (clojure.string/split (slurp "test-input") #"\n")))

(def input
  (filter #(not (clojure.string/starts-with? % "dir")) (drop 1 (clojure.string/split (slurp "input") #"\n"))))

(defn back-path
  [path]
  (clojure.string/join "/" (drop-last 1 (clojure.string/split path #"\/"))))

(defn advance-path
  [current dir]
  (str current "/" dir))

(defn compute-data
  ([instructions] (compute-data instructions "" (set []) (set [""])))
  ([instructions path files dirs]
   (if (empty? instructions)
     [files dirs]
     (let [[instruction & remaining] instructions]
       (cond
         (or (= "$ ls" instruction)
             (clojure.string/starts-with? instruction "dir")) (recur remaining path files dirs)
         (= "$ cd .." instruction) (recur remaining (back-path path) files dirs)
         (clojure.string/starts-with?  instruction "$ cd") (recur remaining (advance-path path (apply str (drop 5 instruction))) files (set (conj dirs (advance-path path (apply str (drop 5 instruction))))))
         true (let [[raw-size file] (clojure.string/split instruction #" ")]
                (recur remaining path (set (conj files [(str path "/" file) (Integer/parseInt raw-size)])) dirs))
         )))))


(def computed (compute-data input))
(def files (first computed))
(def dirs (second computed))
(def directory-sizes
  (map
    (fn [[path content]]
      [path (apply + (map second content))])
      (map
        (fn [dir]
          [dir (filter
            (fn [[path]]
              (clojure.string/starts-with? path (str dir "/")))
            files)])
        dirs)))

(def part1-result
  (apply + (filter #(< % 100000) (map second directory-sizes))))

(println part1-result)

(def sorted-directory (sort-by second directory-sizes))

(def needed-deletion (- (second (last sorted-directory)) (- 70000000 30000000)))

(println needed-deletion)

(def part2-result
  (second (first (drop-while #(<= (second %) needed-deletion) sorted-directory))))

(println part2-result)

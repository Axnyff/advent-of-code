(require 'data)
(def columns 50)
(def rows 10)
(def init-screen
  (vec(repeat 
    rows
    (repeat columns " "))))
(def empty-char
"     
     
     
     
     
     ")
(def full
"#####
#####
#####
#####
#####
#####")

(defn print-screen
  [screen]
  (doseq [line screen]
      (apply print line)))

(defn rect-line->cmd
  [line]
  (let [s (last (.split line " "))
        [raw-width raw-height] (.split s "x")
        width (js/parseInt raw-width 10)
        height (js/parseInt raw-height 10)]
    {:type :rect :data [width height]}))


(defn rotate-line->cmd
  [line]
  (let [[_ dir raw-start _ raw-times] (.split line " ")
        start (js/parseInt (.slice raw-start 2) 10)
        times (js/parseInt raw-times 10)]
    {:type (keyword dir) :data [start times]}))


(defn add-rect
  [screen [width height]]
  (map-indexed
    (fn [i el]
      (if-not (< i height)
        el
        (map-indexed
          (fn [i el]
            (if-not (< i width) el "#"))
          el)
        ))
      screen))

(defn rotate-row
  [screen [start times]]
  (map-indexed
    (fn [row-index row]
      (if-not (= row-index start)
        row
        (map-indexed
          (fn [col-index column]
            (let [modded (mod (- col-index times) columns)]
              (nth row modded)))
          row)))
    screen))

(defn rotate-column
  [screen [start times]]
  (map-indexed
    (fn [row-index row]
      (map-indexed
        (fn [col-index col]
          (let [modded (mod (- row-index times) rows)]
            (if (= start col-index)
              (nth (nth screen modded) col-index)
              (nth (nth screen row-index) col-index))))
        row
        ))
    screen
    
    ))
    


(defn line->cmd
  [line]
  (if (.startsWith line "rect")
    (rect-line->cmd line)
    (rotate-line->cmd line)))


(defn modify-screen
  [screen line]
  (let [cmd (line->cmd line)
        data (:data cmd)
        ]
    (case (:type cmd)
      :rect (add-rect screen data)
      :column (rotate-column screen data)
      :row (rotate-row screen data))))
(def lines
  (.split input "\n"))

(def result
  (reduce
    (fn [acc line]
      (modify-screen acc line))
    init-screen
    lines))
(def all-char (apply concat result))
(print-screen result)

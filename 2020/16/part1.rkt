#lang racket

(define file-contents
  (port->string (open-input-file "input") #:close? #t))

(define data
  (filter
    non-empty-string?
    (string-split file-contents "\n" #:trim? #t)))

(define-values (raw-rules rest) (splitf-at data (lambda (s) (regexp-match? #rx"[a-z ]+: [0-9]" s))))


(define valid-numbers
  (remove-duplicates (append-map
    (lambda (raw-range)
      (match-let ([(list start end) (string-split raw-range "-")])
                 (range
                   (string->number start)
                   (+ 1 (string->number end)))))

    (append-map
      (lambda (raw-rule)
        (let ([rule (regexp-replace #rx"[a-z ]+: " raw-rule "")])
          (string-split rule " or ")))
      raw-rules))))

(define raw-tickets (drop rest 3))



(define tickets-number
  (map string->number (append-map (lambda (line) (string-split line ",")) raw-tickets)))

(define error-rate 
  (apply +
  (filter-not (lambda (num) (member num valid-numbers)) tickets-number)))
(println error-rate)

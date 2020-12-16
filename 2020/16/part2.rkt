#lang racket
(require predicates)

(define file-contents
  (port->string (open-input-file "input") #:close? #t))

(define data
  (filter
    non-empty-string?
    (string-split file-contents "\n" #:trim? #t)))

(define-values (raw-rules rest) (splitf-at data (lambda (s) (regexp-match? #rx"[a-z ]+: [0-9]" s))))


(define my-ticket
  (map string->number (string-split (list-ref rest 1) ",")))

(define rules
  (map
    (lambda (raw-rule)
      (let*
        (
         [name (regexp-replace #rx":.+$" raw-rule "")]
         [ranges (string-split (regexp-replace #rx".+: " raw-rule "") " or ")]
         [valid-numbers
           (append-map
             (lambda (raw-range)
               (match-let ([(list start end) (string-split raw-range "-")])
                (range 

                  (string->number start)
                  (+ 1 (string->number end)))))
             ranges)]

         )
        (list name valid-numbers)))
    raw-rules))

(define tickets
  (map
    (lambda (line)
      (map string->number (string-split line ",")))
  (drop rest 3)))

(define valid-numbers
  (append-map
    (lambda (rule)
      (list-ref rule 1))
    rules))

(define valid-tickets
  (filter
    (lambda (ticket)
      ((all? (lambda (num) (not (not (member num valid-numbers))))) ticket))
    tickets))

(define possible-orders
  (map
    (lambda (ticket)
      (map
        (lambda (num)
          (map first (filter
            (lambda (rule)
              (member num (second rule)))
            rules
            )))

        ticket))

    valid-tickets))

(define rules-name
  (map first rules))

(define (helper pre-order rules-name)
  (let (
        [is-done ((all? (lambda (item) (= 1 (length item)))) pre-order)])
    (if is-done pre-order
      (let* (
             [done-rules (append* (filter (lambda (item) (= 1 (length item))) pre-order))]
             [new-pre-order
               (map (lambda (item)
                      (if (= 1 (length item)) item 
                        (filter-not (lambda (name) (member name done-rules)) item))) pre-order)]
             [new-rules (filter-not (lambda (name) (member name done-rules)) rules-name)]
             )
        (helper new-pre-order new-rules)))))


(define (find-order rules-name)
  (helper (map
    (lambda 
      (index)
      (filter (lambda (rule)
        ((all? (lambda [orders]
                (not (not (member rule (list-ref orders index)))))) possible-orders))


                rules-name))
  (range (length rules-name))) rules-name))

(define order (find-order rules-name))

(define ticket-values
  (map
    (lambda (index)

      (list (first (list-ref order index)) (list-ref my-ticket index)))

    (range (length order))))

(define result
  (apply * (map second (filter
    (lambda (value)
      (regexp-match? #rx"^departure" (first value)))
    ticket-values)
    )))

(println result)


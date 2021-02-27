

VARIABLE INDEX1
VARIABLE INDEX2
VARIABLE VALUE1
VARIABLE VALUE2
VARIABLE NBITEMS

: CALC-NBITEMS
  S" data.fs" INCLUDED
  depth NBITEMS !
  NBITEMS @ 0 DO DROP LOOP
  ;

CALC-NBITEMS



: SOLVE

\ initialization phase
0 INDEX1 !
0 INDEX2 !

BEGIN
    S" data.fs" INCLUDED

\ we drop index1 numbers
INDEX1 @ 0 ?DO DROP LOOP 

\ set the top of the stack to value1
VALUE1 ! 

\ drop index2 numbers
INDEX2 @ 0 ?DO DROP LOOP

 \ set the top of the stack to value2
VALUE2 !

\ nested loop that will test the remaining stack item forming a correct triplet
BEGIN
 \ duplicates the top of the stack in case it's the correct one
      DUP
      VALUE1 @
      VALUE2 @
      + +
      2020 =
\ if it's true then we have found the solution
      IF
        VALUE1 @
        VALUE2 @
        * * . CR BYE
 \ otherwise drop the duplicated item
        ELSE DROP THEN
      depth 0= UNTIL

\ pretty much INDEX2++
  INDEX2 @ 1+ INDEX2 !

\ we test if index1 + index2 + 2 = Nbitems
\ indeed, we drop index1 items, take one, drop index2 items take one so we need more than nbitems + 2
  INDEX1 @ INDEX2 @  + 2 + NBITEMS @ =
  IF

 \ in this case we set index2 to 0 and increments index1
    0 INDEX2 !  INDEX1 @ 1+ INDEX1 !
 THEN
 \ infinite loop ;
  0 UNTIL ;

SOLVE

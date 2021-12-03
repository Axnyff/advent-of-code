: FIND-NUMBER
\ this move the top of the main stack to the return stack
>r 

\ start an undefinite loop, its end will be decided by the UNTIL keyword
BEGIN

\ we need to duplicate the top item
\ we'll need it for the multiplication if it sums to 2020 with the other candidate
DUP

\ duplicate the top item on the return stack into the stack
R@

\ = puts -1 (true) if the two top items are equal, 0 (false) otherwise
+ 2020 =

 \ an if statement !
 \ It looks at the stop of the stack and executes the next instructions
 \ until the ELSE or THEN keyword
  IF

\ If the condtion is true, we are done here
\ We show the multiplication, and line break and stop the execution
  R@ * . CR BYE 

\ otherwise we drop that item
  ELSE DROP

\ then is actually the end of the if statement in that language
  THEN

\ we keep that loop while there is some items in the stack
depth 0= UNTIL

\ manual garbage collection
\ we put the item on the return stack back to the main stack and then drop it
  r> DROP ;


: SOLVE

\ we could properly calculate the number of items
\ but a big enough number will do the trick.
\ this will loop backward from 0 to 300.
300 0 ?DO

\ s" is a word to define a string (which will be ended by ")
S" data.fs" INCLUDED 

\ I is a magic word that will contain the index of the current loop.
\ Here we want to loop from 0 to I and drop elements
I 0 ?DO DROP LOOP

\ we can then call find-number with the stack properly prepared.
FIND-NUMBER
LOOP ;

SOLVE

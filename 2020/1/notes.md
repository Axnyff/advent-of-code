The first day's challenge is looking pretty easy.

First part: Given a list of numbers, we need to find two whose sum is 2020 and return the multiplication of these twos.

As the input is a list of numbers, it's a valid Forth program.


For the first part we're gonna do a pretty dirty solution.
Dynamically include the data on each loop and try and find a matching element.

300 0 DO We're gonna do an arbitrary large loop to test all solution.
This is helpful to get the magic variable I which is the index.


  INCLUDE THE DATA DYNAMICALLY

    S" data.fs" INCLUDED 


    On every iteration of this loop we drop an item : it's already been tested and it has no match. Note that I'm using ?DO instead of DO because the latter seems to be shady around edge condition: for instance, 0 0 DO LOOP seems to be an infinite loop.


    I 0 ?DO DROP LOOP

Then we're gonna call FIND-NUMBER
This method we'll start with a stack the head number containing all possible candidates.


: FIND-NUMBER
  >r
  BEGIN 
  DUP R@ + 2020 = IF R@ * . CR BYE ELSE DROP THEN depth 0= UNTIL r> DROP ;

>R add to the return stack
DUP each elements need to be duplicated otherwise it will disappear after the calcul




Of course loop indexes are also put on the return stack so it's making my life really damn
complicated. One thing that might be useful is that I and J might be used to properly access the return stack. After experimentation it does not work properly, only I seems to not be giving garbage :/

This is becoming unbearable, let's try and use local variables

The language started all nice: installed, seems pretty cool.
Didn't find how to split with multiple characters ( in my case \n\n)
So i had to loop through the whole thing by hand ( looping through a string seems to loop by linesdirectly..)

You have to use $ every time otherwise it's the string : pretty annoying and error prone.
Syntax is non conventional {} for if

Part 2: I guess I'll have to learn a bit more how list works in this things. Hopefully I can structure my data like this

[
  [abc],
  [a, b],
]
o
First run of my script returns me

`$ tclsh part2.tcl
lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines lines`



set char "a"
puts [string map {$char "yolo"} "a"] => bad
puts [string map [list $char "yolo"} "a"] => bad


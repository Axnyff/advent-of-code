set fp [open "input" r]
set file_data [read $fp]
close $fp

set total 0
set newline false
set groups [list]
set lines [list]
set line ""
foreach char [split $file_data ""] {
  if {$char == "\n"} {
    if { $newline } {
      lappend groups $lines
      set newline false
      set lines [list]
    } else {
      set newline true
      lappend lines $line
      set line ""
    }
  } else {
    set newline false
    append line $char
  }
}
lappend groups $lines

set total 0
foreach group $groups {
  set commons [lindex $group 0]
  foreach line $group {
    foreach char [split $commons ""] {
      if { [string first $char $line] == -1} {
        set commons [string map [list $char ""] $commons]
      }
    }
  }
  set total [expr $total + [string length $commons]]
}
puts $total

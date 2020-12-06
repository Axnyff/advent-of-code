set fp [open "input" r]
set file_data [read $fp]
close $fp

set total 0
set newline false
set groupchars ""
foreach char [split $file_data ""] {
  if {$char == "\n"} {
    if { $newline } {
      set total [expr $total + [string length $groupchars]]
      set newline false
      set groupchars ""
    } else {
      set newline true
    }
  } else {
    set newline false
    if { [string first $char $groupchars] == -1} {
      append groupchars $char
    }
  }
}
set total [expr $total + [string length $groupchars]]
puts $total

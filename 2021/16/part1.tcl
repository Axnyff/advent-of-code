set fp [open "input" r]
set file_data [string tolower [read $fp]]
close $fp


set file_data [string range $file_data 0 [expr {[string length $file_data] - 2}]]
binary scan [binary format H* $file_data] B* data

set i 0
set total_version 0
while {$i < [string length $data]} {
  set bin [string range $data $i [expr {$i + 2}]]
  binary scan [binary format B64 [format "%064s" $bin]] W version
  set total_version [expr {$total_version + $version}]
  set i [expr {$i + 3}]

  set bin [string range $data $i [expr {$i + 2}]]
  binary scan [binary format B64 [format "%064s" $bin]] W type

  set i [expr {$i + 3}]

  if { $type == 4 } {
    while {[string index $data $i] != "0"} {
      set i [expr {$i + 5}]
    }
    set i [expr {$i + 5}]
  } else {
    if {[string index $data $i] == "0"} {
      set i [expr {$i + 16}]
    } else {
      set i [expr {$i + 12}]
    }
  }
}
puts $total_version

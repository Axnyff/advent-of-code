set fp [open "input" r]
set file_data [string tolower [read $fp]]
close $fp


set file_data [string range $file_data 0 [expr {[string length $file_data] - 2}]]
binary scan [binary format H* $file_data] B* data

set i 0
set total_version 0

proc parsePacketValue {data i} {
  # ignore version
  set i [expr {$i + 3}]
  set bin [string range $data $i [expr {$i + 2}]]
  binary scan [binary format B64 [format "%064s" $bin]] W type

  set i [expr {$i + 3}]
  set value 0

  set bits ""
  if { $type == 4 } {
    while {[string index $data $i] != "0"} {
      set sub [string range $data [expr {$i + 1}] [expr {$i + 4}]]
      set bits "$bits$sub"
      set i [expr {$i + 5}]
    }
    set sub [string range $data [expr {$i + 1}] [expr {$i + 4}]]
    set bits "$bits$sub"
    set i [expr {$i + 5}]
    binary scan [binary format B64 [format "%064s" $bits]] W value
    return [list $i $value]
  } else {
    set values [list]
    if {[string index $data $i] == "0"} {
      set bits [string range $data [expr {$i +1}] [expr {$i + 15}]]
      binary scan [binary format B64 [format "%064s" $bits]] W length
      set i [expr {$i + 16}]
      set target [expr {$i + $length}]

      while {$i < $target} {
        set result [parsePacketValue $data $i]
        lappend values [lindex $result 1]
        set i [lindex $result 0]
      }
    } else {
      set bits [string range $data [expr {$i + 1}] [expr {$i + 11}]]
      binary scan [binary format B64 [format "%064s" $bits]] W items
      set i [expr {$i + 12}]
      for {set index 0} {$index < $items} {incr index} {
        set result [parsePacketValue $data $i]
        lappend values [lindex $result 1]
        set i [lindex $result 0]
      }
    }
    if { $type == 0} {
      set value 0
      foreach {num} $values {
        set value [expr {$value + $num}]
      }
      return [list $i $value]
    }
    if { $type == 1} {
      set value 1
      foreach {num} $values {
        set value [expr {$value * $num}]
      }
      return [list $i $value]
    }
    if { $type == 2} {
      set value [lindex $values 0]
      foreach {num} $values {
        if {$num < $value} {
          set value $num
        }
      }
      return [list $i $value]
    }
    if { $type == 3} {
      set value [lindex $values 0]
      foreach {num} $values {
        if {$num > $value} {
          set value $num
        }
      }
      return [list $i $value]
    }

    if { $type == 5} {
      if {[lindex $values 0] > [lindex $values 1]} {
        set value 1
      } else {
        set value 0
      }
      return [list $i $value]
    }
    if { $type == 6} {
      if {[lindex $values 0] < [lindex $values 1]} {
        set value 1
      } else {
        set value 0
      }
      return [list $i $value]
    }
    if { $type == 7} {
      if {[lindex $values 0] == [lindex $values 1]} {
        set value 1
      } else {
        set value 0
      }
      return [list $i $value]
    }
  }
}

set result [parsePacketValue $data $i]
puts [lindex $result 1]

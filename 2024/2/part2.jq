def is_safe(f; can_ignore):
reduce f[] as $item (null;
    if . == null then 
      $item 
    else 
    (
      if . == false then 
        false 
      else 
        (if type == "number" then
          (
            if (. - $item > 3 or $item - . > 3 or $item == .) then
            (if can_ignore then [., "wat", 1] else false end)
            else [$item, if $item > . then "asc" else "desc" end, 0]
            end
          )
          else
          (
            if (.[0] - $item > 3 or $item - .[0] > 3 or $item == .[0] or ($item > .[0] and .[1] == "desc") or
              ($item < .[0] and .[1] == "asc")
            ) then
            (if (.[2] == 1 or can_ignore == false) then false else [.[0], .[1], 1] end)
            else [$item, if $item > .[0] then "asc" else "desc" end, .[2]]
            end
          )
          end)
      end
    )
    end) | if . == false then false else true end;

. | split("\n") | .[] | split(" ") | [.[] | tonumber] | 
  is_safe((.[1:]); false) 
  or is_safe(.[0:1] + .[2:]; false)
  or is_safe(.[0:2] + .[3:]; false)
  or is_safe(.[0:3] + .[4:]; false)
  or is_safe(.[0:4] + .[5:]; false)
  or is_safe(.[0:5] + .[6:]; false)
  or is_safe(.[0:6] + .[7:]; false)
  or is_safe(.[0:7] + .[8:]; false)
  or is_safe(.[0:8] + .[9:]; false)
  or is_safe(.[0:9] + .[10:]; false)
| select(. == true)

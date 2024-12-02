def is_safe(f; can_ignore):
reduce f as $item (null;
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
              false
            else [$item, if $item > . then "asc" else "desc" end]
            end
          )
          else
          (
            if (.[0] - $item > 3 or $item - .[0] > 3 or $item == .[0] or ($item > .[0] and .[1] == "desc") or
              ($item < .[0] and .[1] == "asc")
            ) then
              false
            else [$item, .[1]]
            end
          )
          end)
      end
    )
    end) | if . == false then false else true end;

. | split("\n") | .[] | split(" ") | [.[] | tonumber] | is_safe(.[]; false) | select(. == true)

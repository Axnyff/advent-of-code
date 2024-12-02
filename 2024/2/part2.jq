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
            (if can_ignore then [$item, if $item > . then "asc" else "desc" end, 1] else false end)
            else [$item, if $item > . then "asc" else "desc" end, 0]
            end
          )
          else
          (
            if (.[0] - $item > 3 or $item - .[0] > 3 or $item == .[0] or ($item > .[0] and .[1] == "desc") or
              ($item < .[0] and .[1] == "asc")
            ) then
            (if (.[2] == 1 or can_ignore == false) then false else [.[0], .[1], 1] end)
            else [$item, .[1], .[2]]
            end
          )
          end)
      end
    )
    end) | if . == false then false else true end;

. | split("\n") | .[] | split(" ") | [.[] | tonumber] | is_safe(.[]; true) or is_safe(.[1:]; false) | select(. == true)

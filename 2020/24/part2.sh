jq -n  --rawfile data test-input -f part1.jq \
  | jq -s "group_by(.) | [.[] | select(length %2 != 0)] | .[][0]" \
  | jq -s '. as $items|
  map(
  [
    [.[0], .[1] + 1],
    [.[0], .[1] - 1],
    [.[0] - 0.5, .[1] + 0.5],
    [.[0] + 0.5, .[1] + 0.5],
    [.[0] - 0.5, .[1] - 0.5],
    [.[0] - 0.5, .[1] - 0.5]
    ]) | flatten(1) | unique |
      map(. as $el | $items | map(select(. == $el)) | if (length == 0) 
        then
          [$el, "new"]
        else 
          [$el, "old"]
        end) | flatten(1)'

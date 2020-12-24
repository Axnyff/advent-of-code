echo "[[0, 0], [0, 1], [0.5, 0.5]]" | jq '
  . as $items|
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
        end)'

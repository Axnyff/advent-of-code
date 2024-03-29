cat yolo.json | jq '
  . as $items|
  map([
    [.[0], .[1] + 1],
    [.[0], .[1] - 1],
    [.[0] - 0.5, .[1] + 0.5],
    [.[0] + 0.5, .[1] + 0.5],
    [.[0] - 0.5, .[1] - 0.5],
    [.[0] - 0.5, .[1] - 0.5]
    ]
    ) | flatten(1) | unique |
      map(select([
    [.[0], .[1] + 1],
    [.[0], .[1] - 1],
    [.[0] - 0.5, .[1] + 0.5],
    [.[0] + 0.5, .[1] + 0.5],
    [.[0] - 0.5, .[1] - 0.5],
    [.[0] - 0.5, .[1] - 0.5]] as $neighbours |

    . as $el | $items | map(select(. == $el)) | if (length == 0)
        then
          ($neighbours | map(select(. as $neigh | $items | (map(select(. == $neigh))) | length > 0)) | length) == 2
        else
          ($neighbours | map(select(. as $neigh | $items | (map(select(. == $neigh))) | length > 0)) | length) | inside(1, 2)
        end))' > yolo2.json

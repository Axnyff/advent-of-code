jq -n  --rawfile data input -f part1.jq \
  | jq -s "group_by(.) | [.[] | select(length %2 != 0)] | .[][0]" \
  | jq -s ' {i: 0, items: .} | while(.i < 101; .items as $items | .i as $i
  | $items |
  map([
    [.[0], .[1]],
    [.[0], .[1] + 1],
    [.[0], .[1] - 1],
    [.[0] - 0.5, .[1] + 0.5],
    [.[0] + 0.5, .[1] + 0.5],
    [.[0] - 0.5, .[1] - 0.5],
    [.[0] + 0.5, .[1] - 0.5]
    ]
    ) | flatten(1) | unique | map(select([
    [.[0], .[1] + 1],
    [.[0], .[1] - 1],
    [.[0] - 0.5, .[1] + 0.5],
    [.[0] + 0.5, .[1] + 0.5],
    [.[0] - 0.5, .[1] - 0.5],
    [.[0] + 0.5, .[1] - 0.5]] as $neighbours |

    . as $el | $items | map(select(. == $el)) | if (length == 0)
        then
          ($neighbours | map(select(. as $neigh | $items | (map(select(. == $neigh))) | length > 0)) | length) == 2
        else
          ($neighbours | map(select(. as $neigh | $items | (map(select(. == $neigh))) | length > 0)) | length) | . == 1 or . == 2
        end)) | {items: ., i: ($i + 1)}) | select(.i > 0) | [.i, .items |length]'

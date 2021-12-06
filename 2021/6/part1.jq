$data | .[0:-1] | split(",") | map(tonumber) | {i: 0, items: .} |
[while (.i < 81; .i as $i | .items as $items | 
{
  i: ($i + 1),
  items:
    ($items | map(if . == 0 then [6, 8] else [. - 1] end) | flatten)
}
) | .items] | last | length


$data | .[0:-1] | split(",") | map(tonumber) | group_by(.) |
map(
{(.[0] | tostring): (. | length)}) |
add |
{i: 0, data: .} |
[while (.i <= 256; .i as $i | .data as $data |
  {j: 0, result: {}} 
  | [while (.j < 10; .j as $j | .result as $result |
  if $j == 0 then
    .result | .["6"] = $data["0"] + $data["7"] | .["8"] = $data["0"]
  elif $j == 7 then
    .result
  else
    .result | .[($j - 1) | tostring] = $data[$j | tostring]
  end |
  {j: ($j + 1), result: .})] | last |

{i: ($i + 1), data: .result})] | last | .data | to_entries | map(.value) | add


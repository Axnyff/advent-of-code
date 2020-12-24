jq -n  --rawfile data input -f part1.jq | jq -s "group_by(.) | [.[] | select(length %2 != 0)] | length"

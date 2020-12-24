jq -n  --rawfile data test-input -f part1.jq | jq -s "group_by(.) | [.[] | select(length %2 != 0)] | flatten(1)" > yolo.json

jq -n  --rawfile data test-input -f part1.jq | jq -s "group_by(.) | [.[] | select(length %2 == 0)] | length"



[
  100,
  4280
]

real    93m21.027s
user    93m17.943s
sys     0m1.777s

min=1000
arr=()
while read line
do
  step1=${line//B/1}
  step2=${step1//F/0}
  step3=${step2//L/0}
  step4=${step3//R/1}
  num="$((2#$step4))"

  if (($num < $min)); then
    min=$num
  fi
  arr+=($num)
done < "input"
while ((prevmin != min))
do
  prevmin=$min
  for t in ${arr[@]}; do
    if (($t == $min + 1)); then
      min=$t
    fi
  done
done
echo $(($min + 1))

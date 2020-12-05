max=0
while read line
do
  step1=${line//B/1}
  step2=${step1//F/0}
  step3=${step2//L/0}
  step4=${step3//R/1}
  num="$((2#$step4))"

  if (($num > $max)); then
    max=$num
  fi
done < "input"
echo $max

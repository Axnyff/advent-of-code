#!/bin/bash
player1_position=9
player2_position=3

die_roll=1
player1_score=0

player2_score=0
player_turn=0

arr=()

declare -A data
key="${player1_score}-${player1_position}-${player2_score}-${player2_position}-${player_turn}"
data[$key]=1
player1_wins=0
player2_wins=0

iter=0
while :
do
  iter=$(( $iter + 1 ))
  echo $iter
  keys=${!data[@]}
  if [ ! -n "$keys" ]; then
    break
  fi
  for key in "${!data[@]}"; do 
    value=${data[$key]}
    arr=(${key//-/ })
    unset data[$key]
    player1_score=${arr[0]}
    player1_position=${arr[1]}
    player2_score=${arr[2]}
    player2_position=${arr[3]}
    player_turn=${arr[4]}
    for i in {1..3}; do
      for j in {1..3}; do
        for k in {1..3}; do
          advance=$(($i + $j + $k))
          player1_score=${arr[0]}
          player1_position=${arr[1]}
          player2_score=${arr[2]}
          player2_position=${arr[3]}
          if [[ $player_turn -eq 0 ]]; then
            player1_position=$(( ( ($player1_position + $advance - 1) % 10) + 1 ))
            player1_score=$(( $player1_score + $player1_position ))
          else
            player2_position=$(( ( ($player2_position + $advance - 1) % 10) + 1 ))
            player2_score=$(( $player2_score + $player2_position ))
          fi
          new_player_turn=$((!$player_turn))
          key="${player1_score}-${player1_position}-${player2_score}-${player2_position}-${new_player_turn}"
          existing=${data[$key]}
          if [ ! -n "$existing" ]; then
            existing=$value
          else
            existing=$(( $existing + $value))
          fi

          if [[ $player1_score -ge 21 ]] ; then
            player1_wins=$(( $player1_wins + $value))
          elif [[ $player2_score -ge 21 ]] ; then
            player2_wins=$(( $player2_wins + $value))
          else
            data[$key]=$existing
          fi
        done
      done
    done
  done
done
echo $player1_wins
echo $player2_wins

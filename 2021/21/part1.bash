#!/bin/bash
player1_position=9
player2_position=3

die_roll=1
player1_score=0

player2_score=0
player_turn=0

while [ $player1_score -lt 1000 -a $player2_score -lt 1000 ]
do
  if [[ $player_turn -eq 0 ]]; then
    for i in {1..3}; do
      player1_position=$((player1_position + ( ( (die_roll - 1) % 100) +1 ) ))
      die_roll=$((die_roll + 1))
    done
    player1_position=$(( ( (player1_position - 1) % 10) + 1 ))
    player1_score=$((player1_score + player1_position))
  fi
  if [[ $player_turn -eq 1 ]]; then
    for i in {1..3}; do
      player2_position=$((player2_position + ( ( (die_roll - 1) % 100) + 1) ))
      die_roll=$((die_roll + 1))
    done
    player2_position=$(( ( (player2_position - 1) % 10) + 1 ))
    player2_score=$((player2_score + player2_position))
  fi
  player_turn=$((!player_turn))
done
if [[ $player_turn -eq 0 ]]; then
  echo $(( (die_roll - 1) * player1_score))
fi

if [[ $player_turn -eq 1 ]]; then
  echo $(( (die_roll - 1) * player2_score))
fi

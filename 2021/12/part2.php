<?php

$filename = 'input';
$f = fopen($filename, 'r');
$contents = fread($f, filesize($filename));

$lines = explode("\n", $contents);

$paths = [];

foreach($lines as &$line) {
  if ($line) {
    $items = explode("-", $line);
    $paths[$items[0]] = array_merge($paths[$items[0]] ?? [], [$items[1]]);;
    $paths[$items[1]] = array_merge($paths[$items[1]] ?? [], [$items[0]]);;
  }
}

function is_done($arr) {
  $has_unfinished = false;
  foreach($arr as &$item) {
    if (end($item) !== 'end') {
      $has_unfinished = true;
    }
  }
  return !$has_unfinished;
}


$current = [['start']];

function has_visited_twice($path) {
  $counts = [];
  foreach ($path as &$item) {
    if (in_array($item, $counts) && $item == strtolower($item)) {
      return true;
    }
    array_push($counts, $item);
  }
  return false;
}

while (!is_done($current)) {
  $next = [];
  foreach ($current as &$item) {
    $end = end($item);
    if ($end == 'end') {
      array_push($next, $item);
    } else {
      $possibles = $paths[$end];
      foreach ($possibles as &$possible) {
        if ($possible != strtolower($possible) || !in_array($possible, $item)) {
          array_push($next, array_merge($item, [$possible]));
        } else if ($possible != 'start' && !has_visited_twice($item)) {
          array_push($next, array_merge($item, [$possible]));
        }
      }
    }
  }
  $current = $next;
}

echo "Nb items: " . count($current) . "\n";

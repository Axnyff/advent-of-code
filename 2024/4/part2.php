<?php
  $content = trim(file_get_contents("input"));
  $lines = explode("\n", $content);
  $cols = count($lines);
  $rows = 0;
  $content = array();

  for ($i = 0; $i < $cols; $i++) {
    $line = str_split($lines[$i], 1);
    $rows = count($line);
    for ($j = 0; $j < $rows; $j++) {
      $content[$i . "-" . $j] = $line[$j];
    }
  }

  function getKey($i, $j) {
    return $i . "-" . $j;
  }

  function check($content, $array) {
    $data = array("A", "S", "M", "S");

    for ($i = 0; $i < count($array); $i++) {
      if (!array_key_exists($array[$i], $content) || $content[$array[$i]] != $data[$i]) {
        return 0;
      }
    }
    return 1;
  }

  function checkAll($i, $j, $content) {
    return check($content,
      array(getKey($i + 1, $j + 1), getKey($i + 2, $j + 2), getKey($i + 2, $j), getKey($i, $j + 2)
    )) + check($content,
      array(getKey($i - 1, $j - 1), getKey($i - 2, $j - 2), getKey($i - 2, $j), getKey($i, $j - 2)
    )) + check($content,
      array(getKey($i - 1, $j - 1), getKey($i - 2, $j - 2), getKey($i, $j - 2), getKey($i - 2, $j)
    )) + check($content,
      array(getKey($i + 1, $j + 1), getKey($i + 2, $j + 2), getKey($i, $j + 2), getKey($i + 2, $j)
    ));

  }

  $total = 0;
  for ($i = 0; $i < $cols; $i++) {
    for ($j = 0; $j < $rows; $j++) {
      if ($content[$i . "-" . $j] == "M") {
        $total += checkAll($i, $j, $content);
      }
    }
  }

  echo $total . "\n";

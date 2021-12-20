SELECT value from generate_series(138241, 674034) as s(value)
  where REGEXP_REPLACE(value::TEXT, '(\d)\1', 'YOLO') NOT LIKE '%YOLO%';


BEGIN;

  CREATE TABLE frequencies(
    id SERIAL,
    value INT
  );

  \copy frequencies(value) from '1/input' with delimiter E' ';


  -- PART 1
  SELECT sum(value) from frequencies;

  -- PART 2
  SELECT cumul from
  (SELECT id, x, sum(value) OVER (ORDER BY x, id) as cumul from frequencies CROSS JOIN generate_series(1, 200) as x) as data
  GROUP BY cumul HAVING count(*) = 2 ORDER BY max(x), max(id) limit 1;

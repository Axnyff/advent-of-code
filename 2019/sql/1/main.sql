BEGIN;

  CREATE TABLE module(
    id SERIAL,
    mass INT
  );

  \copy module(mass) from '1/input' with delimiter E' ';

  -- PART 1
  SELECT sum((mass / 3) -2 ) from module;

  -- PART 2
  WITH RECURSIVE fuel(n) AS (
    SELECT (mass / 3) - 2 from module
    UNION all
      SELECT (n / 3) - 2 from fuel where (n / 3) > 2
  )
  SELECT sum(n) from fuel;


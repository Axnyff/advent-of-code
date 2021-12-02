BEGIN;
  CREATE TABLE instruction(
    direction TEXT,
    amount INT
  );

  \copy instruction(direction, amount) from 'input' with delimiter E' ';

  -- PART 1
  SELECT
    SUM(amount) FILTER (WHERE direction = 'forward') *
      (SUM(amount) FILTER (where direction = 'down')
      - (SUM(amount) FILTER (where direction = 'up')))

        from instruction limit 1;


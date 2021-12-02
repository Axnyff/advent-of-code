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

  -- PART 2
  WITH RECURSIVE data(position, profondeur, aim, i, nb_items) AS (
    SELECT 0, 0, 0, 0, count(*) from instruction
    UNION ALL
    select
      -- position
      case WHEN (SELECT direction from instruction offset i limit 1) IN ('up', 'down') then position ELSE position + (SELECT amount from instruction offset i limit 1) END,
      -- profondeur
      case WHEN (SELECT direction from instruction offset i limit 1) IN ('up', 'down') then profondeur ELSE profondeur + aim * (SELECT amount from instruction offset i limit 1) END,
      -- aim
      case
        WHEN (SELECT direction from instruction offset i limit 1) = 'up' then aim -  (SELECT amount from instruction offset i limit 1)
        WHEN (SELECT direction from instruction offset i limit 1) = 'down' then aim +  (SELECT amount from instruction offset i limit 1)
        ELSE aim
      END

      , i + 1, nb_items from data where i < nb_items
  )
  SELECT position * profondeur from data where i = (SELECT count(*) from instruction);

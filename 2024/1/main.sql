BEGIN;
    CREATE TABLE raw_data(
      id SERIAL,
      a VARCHAR
    );

    \copy raw_data(a) from 'input';

    WITH data as (
      SELECT split_part(a, '   ', 1):: INTEGER a,
      split_part(a, '   ', 2)::INTEGER b
      from raw_data
    ), sorted_a as (
      SELECT a, ROW_NUMBER() OVER (order by a ) i from data order by a
    ), sorted_b as (
      SELECT b, ROW_NUMBER() OVER (order by b) i2 from data order by b
    )
    SELECT SUM(ABS(a - b)) from sorted_a INNER JOIN sorted_b on i = i2;

    WITH data as (
      SELECT split_part(a, '   ', 1):: INTEGER a,
      split_part(a, '   ', 2)::INTEGER b
      from raw_data
    )
    SELECT SUM(a * (SELECT count(*) from data where d.a = b)) from data d;

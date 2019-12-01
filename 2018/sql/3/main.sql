BEGIN;

  CREATE TABLE data (
    line VARCHAR(50)
  );

  \copy data from '3/input';

  -- PART 1
  select count(*) from (
      select null from (
          select
          matches[1] as id,
          CAST(matches[2] AS INT) as x,
          CAST(matches[3] AS INT) as y,
          CAST(matches[4] AS INT) as width,
          CAST(matches[5] AS INT) as height
          from (
              select
              regexp_matches(line, '(#\d+) @ (\d+),(\d+): (\d+)x(\d+)') as matches
              from data
          ) as matched_data) as claims
    CROSS JOIN
      generate_series(claims.y, claims.y - 1 + claims.height) as series_y,
      generate_series(claims.x, claims.x - 1+ claims.width) as series_x
    GROUP BY
      series_x, series_y
    HAVING
      count(id) > 1)
  as pos;

  -- PART 2
  WITH positions as (
    select id, series_x, series_y from (
      select
      matches[1] as id,
      CAST(matches[2] AS INT) as x,
      CAST(matches[3] AS INT) as y,
      CAST(matches[4] AS INT) as width,
      CAST(matches[5] AS INT) as height
      from (
        select
        regexp_matches(line, '(#\d+) @ (\d+),(\d+): (\d+)x(\d+)') as matches
        from data
    ) as matched_data) as claims
  CROSS JOIN
  generate_series(claims.y, claims.y - 1 + claims.height) as series_y,
  generate_series(claims.x, claims.x - 1+ claims.width) as series_x),
    ids as (
      select (regexp_matches(line, '(#\d+) @ (\d+),(\d+): (\d+)x(\d+)'))[1] as id from data
    )

  select id from ids WHERE NOT EXISTS(
    SELECT * from positions p1, positions p2
          where p1.id = ids.id AND
                p2.id != p1.id AND
                p1.series_x = p2.series_x AND
                p1.series_y = p2.series_y
  );



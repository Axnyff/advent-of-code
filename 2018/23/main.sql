BEGIN;

  CREATE TABLE data(
    line VARCHAR(50)
  );

  \copy data from '23/input';

  -- PART 1
  WITH
    matches AS (
    SELECT regexp_matches(
      line,
      'pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)'
    ) as match from data),

    nanobots AS (
    SELECT
      CAST(match[1] as INT) x,
      CAST(match[2] as INT) y,
      CAST(match[3] as INT) z,
      CAST(match[4] as INT) r
      from matches),

    best_nanobot AS (
      SELECT * from nanobots where r = (SELECT max(r) from nanobots)
    )

    SELECT
      count(*)
      from nanobots n,
      best_nanobot bn
      where bn.r >= ABS(bn.x - n.x) + ABS(bn.y - n.y) + ABS(bn.z - n.z);

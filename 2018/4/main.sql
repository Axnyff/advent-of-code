BEGIN;

  CREATE TABLE data (
    line VARCHAR(50)
  );

  \copy data from '4/input';

  -- PART 1
  WITH
  raw_events AS (
    SELECT
    CAST(
      (regexp_matches(line, '\[(.+)\]'))[1]
      AS TIMESTAMP
    ) as ts,
    CAST((regexp_matches(line, 'Guard #(\d+)'))[1] AS INT) as guard_id,
    (regexp_matches(line, 'asleep'))[1] as asleep
    from data ORDER BY ts
  ),
  events AS (
    select ts,
    (SELECT guard_id from raw_events e2
      WHERE
      guard_id IS NOT NULL AND
      e2.ts <= e1.ts
      ORDER BY
      ts DESC
      LIMIT 1),
    asleep IS NOT NULL as asleep
    from raw_events e1
  ),
  guards_and_minutes AS (
    SELECT extract(minute from timestamp) as minute, guard_id FROM
    (SELECT timestamp,
      (SELECT guard_id from events
        where ts <= timestamp
        ORDER BY ts desc
        limit 1),
      (SELECT asleep from events
        where ts <= timestamp
        ORDER BY ts desc
        limit 1)
      from
      generate_series((SELECT min(ts) from events), (SELECT max(ts) from events), '1 minute') as timestamp
      where
      extract(hour from timestamp) = 0) as timestamp where asleep = true),

  most_common_guard as (SELECT guard_id from guards_and_minutes GROUP BY guard_id ORDER by count(*) DESC limit 1),
  most_common_minute as ( SELECT minute from guards_and_minutes where guard_id = (SELECT * from most_common_guard limit 1) GROUP BY minute ORDER BY count(*) DESC LIMIT 1)
  SELECT (
    (SELECT * from most_common_guard LIMIT 1) *
    (SELECT * from most_common_minute LIMIT 1));


  WITH
  raw_events AS (
    SELECT
    CAST(
      (regexp_matches(line, '\[(.+)\]'))[1]
      AS TIMESTAMP
    ) as ts,
    CAST((regexp_matches(line, 'Guard #(\d+)'))[1] AS INT) as guard_id,
    (regexp_matches(line, 'asleep'))[1] as asleep
    from data ORDER BY ts
  ),
  events AS (
    select ts,
    (SELECT guard_id from raw_events e2
      WHERE
      guard_id IS NOT NULL AND
      e2.ts <= e1.ts
      ORDER BY
      ts DESC
      LIMIT 1),
    asleep IS NOT NULL as asleep
    from raw_events e1
  ),
  guards_and_minutes AS (
    SELECT extract(minute from timestamp) as minute, guard_id FROM
    (SELECT timestamp,
      (SELECT guard_id from events
        where ts <= timestamp
        ORDER BY ts desc
        limit 1),
      (SELECT asleep from events
        where ts <= timestamp
        ORDER BY ts desc
        limit 1)
      from
      generate_series((SELECT min(ts) from events), (SELECT max(ts) from events), '1 minute') as timestamp
      where
      extract(hour from timestamp) = 0) as timestamp where asleep = true),

  most_common_minute as (SELECT minute from guards_and_minutes GROUP BY minute ORDER by count(*) DESC limit 1),
  most_common_guard as (SELECT guard_id from guards_and_minutes where minute = (SELECT * from most_common_minute limit 1) GROUP BY guard_id ORDER BY count(*) DESC LIMIT 1)
  SELECT (
    (SELECT * from most_common_guard LIMIT 1) *
    (SELECT * from most_common_minute LIMIT 1));


BEGIN;

  CREATE TABLE data(
    value VARCHAR
  );

  \copy data(value) from 'input';

  WITH matches as (
    SELECT regexp_matches(value, '(\d+)-(\d+) (\w): (\w+)') m from data
  ),
  lines as(
    SELECT (m[1])::INT min_count, (m[2])::INT max_count, m[3] letter, m[4] pword, length(m[4]) len, length(replace(m[4], m[3], '')) replaced_len from matches
  )
  SELECT count(*) from lines where len - replaced_len BETWEEN min_count AND max_count;

BEGIN;

  CREATE TABLE data(
    value VARCHAR
  );

  \copy data(value) from 'input';

  WITH matches as (
    SELECT regexp_matches(value, '(\d+)-(\d+) (\w): (\w+)') m from data
  ),
  lines as(
    SELECT (m[1])::INT index1, (m[2])::INT index2, m[3] letter, m[4] pword from matches
  )
  SELECT count(*) from lines
    WHERE
      (CASE WHEN substring(pword from index1 for 1) = letter THEN 1 ELSE 0 END) +
      (CASE WHEN substring(pword from index2 for 1) = letter THEN 1 ELSE 0 END)
      = 1;

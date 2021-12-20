BEGIN;

  CREATE TABLE box(
    id VARCHAR(40)
  );

  \copy box from '2/input' with delimiter E' ';


  SELECT
  sum(count_3) * sum(count_2) from (
    SELECT
    (SELECT 1 from regexp_split_to_table(id, '') as char GROUP BY char HAVING count(*) = 3 limit 1) as count_3,
    (SELECT 1 from regexp_split_to_table(id, '') as char GROUP BY char HAVING count(*) = 2 limit 1) as count_2
    from box
  ) as data;


  SELECT
  string_agg(substring(id1 from x for 1), '') from (
    SELECT
    b1.id as id1, b2.id as id2
    from box b1, box b2, generate_series(1, (SELECT length(id) from box limit 1)) as x
    where
    b1.id != b2.id
    AND
    b2.id LIKE
    (substring(b1.id from 1 for x) || '_' || substring(b1.id from x + 2 for length(b1.id))) limit 1) as matching_lignes,
  generate_series(1, length(id1)) as x
  where substring(id1 from x for 1) = substring(id2 from x for 1);

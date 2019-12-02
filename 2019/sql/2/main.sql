BEGIN;

  CREATE TABLE numbers(
    id SERIAL,
    value VARCHAR
  );

  \copy numbers(value) from '2/input' with delimiter E' ';

  -- PART 1
  WITH RECURSIVE starting_data as (
    SELECT array_cat(ARRAY[(string_to_array(value, ','))[1]::INT, 12, 2], (string_to_array(value, ',')::INT[])[4:]) as data from numbers
  ),
  final_data(data, position) as (
    SELECT data, 1 as position from starting_data
    UNION ALL
      SELECT
        CASE WHEN data[position] = 1
          THEN
          array_cat(
            data[1:data[position + 3]],
            array_cat(
            ARRAY[(data[data[position + 1] + 1] + data[data[position + 2] + 1])],
            data[data[position + 3] +2 :]))
          WHEN data[position] = 2
            THEN
            array_cat(
              data[1:data[position + 3]],
              array_cat(
              ARRAY[(data[data[position + 1] + 1] * data[data[position + 2] + 1])],
              data[data[position + 3] +2:]))
          else data
        END
      , position + 4 from final_data where data[position] != 99
  )

  SELECT data[1] as "Part 1" from final_data order by position desc limit 1;



  -- PART 2

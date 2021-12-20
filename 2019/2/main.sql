BEGIN;

  CREATE TABLE numbers(
    id SERIAL,
    value VARCHAR
  );

  \copy numbers(value) from '2/input' with delimiter E' ';

  -- PART 1
  WITH RECURSIVE starting_data as (
    SELECT array_cat(ARRAY[(string_to_array(value, ','))[1]::BIGINT, 12, 2], (string_to_array(value, ',')::BIGINT[])[4:]) as data from numbers
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
  WITH RECURSIVE nouns as (
    SELECT * from generate_series(1, 99) as noun
  ),
  verbs as (
    SELECT * from generate_series(1, 99) as verb
  ),
  starting_data as (
    SELECT noun, verb, array_cat(ARRAY[(string_to_array(value, ','))[1]::BIGINT, noun, verb], (string_to_array(value, ',')::BIGINT[])[4:]) as data from numbers,
    nouns, verbs
  ),
  final_data(data, noun, verb, position) as (
    SELECT data, noun, verb, 1 as position from starting_data
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
      , noun, verb, position + 4 from final_data where data[position] != 99 AND position < array_length(data, 1)
  )


  SELECT noun *100 + verb as "Part 2" from final_data where data[1] = 19690720;



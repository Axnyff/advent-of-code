BEGIN;

  CREATE TABLE raw_wire(
    id serial,
    value TEXT
  );

  \copy raw_wire(value) from '3/input' with delimiter E' ';

  WITH RECURSIVE raw_data as (
    SELECT id as wire, row_number() OVER(PARTITION BY id) as step_index, raw_instruction
    FROM (
      SELECT id, regexp_split_to_table(value, ',') as raw_instruction from raw_wire
    ) as tmp
  ),
  instructions as (
    SELECT wire, step_index, substring(raw_instruction for 1) as direction, substring(raw_instruction from '^.(.+)$')::INT as steps from raw_data
  ),
  moves as (
    SELECT wire, step_index, direction, generate_series(1, steps) as step_count from instructions
  ) ,
  wire1_position(wire, x, y, step_index, step_count, direction) as (
    SELECT 1, 0, 0, 1, 1, 'N' 
    UNION ALL
      SELECT wire,

        CASE WHEN direction IN ('U', 'D', 'N')
            THEN x
          WHEN direction = 'R'
            THEN x + 1
          ELSE x -1
        END,
        CASE WHEN direction IN ('L', 'R', 'N')
          THEN y
          WHEN direction = 'U'
            THEN y + 1
          ELSE y -1
        END,
        CASE WHEN EXISTS
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index AND step_count = p.step_count + 1)
        THEN  step_index
        ELSE step_index + 1
        END as step_index,
        CASE WHEN EXISTS
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index AND step_count = p.step_count + 1)
        THEN step_count + 1
        ELSE 1
        END as step_count,
        (SELECT direction from moves where wire = p.wire AND p.step_index = step_index limit 1)
         as direction
        from wire1_position p WHERE EXISTS(
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index AND step_count = p.step_count - 1)
        ) OR EXISTS(
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index + 1 AND step_count = 1)
      )
  ),
  wire2_position(wire, x, y, step_index, step_count, direction) as (
    SELECT 2, 0, 0, 1, 1, 'N' 
    UNION ALL
      SELECT wire,

        CASE WHEN direction IN ('U', 'D', 'N')
            THEN x
          WHEN direction = 'R'
            THEN x + 1
          ELSE x -1
        END,
        CASE WHEN direction IN ('L', 'R', 'N')
          THEN y
          WHEN direction = 'U'
            THEN y + 1
          ELSE y -1
        END,
        CASE WHEN EXISTS
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index AND step_count = p.step_count + 1)
        THEN  step_index
        ELSE step_index + 1
        END as step_index,
        CASE WHEN EXISTS
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index AND step_count = p.step_count + 1)
        THEN step_count + 1
        ELSE 1
        END as step_count,
        COALESCE ((SELECT direction from moves where wire = p.wire AND p.step_index = step_index limit 1), 'N')
         as direction
        from wire2_position p WHERE EXISTS(
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index AND step_count = p.step_count -1)
        ) OR EXISTS(
          (SELECT * from moves where p.wire = wire AND step_index = p.step_index + 1 AND step_count = 1)
      )
  )
  /* SELECT w1.x, w1.y from wire1_position as w1, wire2_position as w2 */
  /*   where w1.x != 0 AND w1.y != 0 AND w1.x = w2.x AND w1.y = w2.y; */
  SELECT MIN( ABS(w1.x) + ABS(w1.y)) from wire1_position as w1, wire2_position as w2
    where w1.x != 0 AND w1.y != 0 AND w1.x = w2.x AND w1.y = w2.y;


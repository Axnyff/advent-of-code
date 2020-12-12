-module(part1).
-export([start/0]).

start() ->
    Lines = readlines("test-data"),
    {X, Y, _} = solve(Lines, {0, 0, {1, 0}}),
    io:fwrite("~w ~n", [abs(X) + abs(Y)]).


rotate(0, Dir) -> Dir;
rotate(N, {XDir, YDir}) when N > 0 -> rotate(N - 90, { YDir, -XDir });
rotate(N, {XDir, YDir}) when N < 0 -> rotate(N + 90, { -YDir, XDir}).

solve([], State) -> State;
solve(([Line|Rest]), {X, Y, {XDir, YDir}}) ->
  case Line of
    [$F | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X + XDir * Num, Y + YDir * Num, {XDir, YDir}});
    [$R | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X, Y, rotate(Num, {XDir, YDir})});
    [$L | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X, Y, rotate(-Num, {XDir, YDir})});
    [$E | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X + Num, Y, {XDir, YDir}});
    [$N | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X , Y + Num, {XDir, YDir}});
    [$S | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X , Y - Num, {XDir, YDir}});
    [$W | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X - Num, Y, {XDir, YDir}})
  end.



readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    try get_all_lines(Device)
      after file:close(Device)
    end.

get_all_lines(Device) ->
    case io:get_line(Device, "") of
        eof  -> [];
        Line -> [string:trim(Line)] ++ get_all_lines(Device)
    end.

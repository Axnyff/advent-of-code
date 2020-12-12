-module(part2).
-export([start/0]).

start() ->
    Lines = readlines("input"),
    {X, Y, _, _} = solve(Lines, {0, 0, 10, 1}),
    io:fwrite("~w ~n", [abs(X) + abs(Y)]).


rotate(0, Dir) -> Dir;
rotate(N, {XDir, YDir}) when N > 0 -> rotate(N - 90, { YDir, -XDir });
rotate(N, {XDir, YDir}) when N < 0 -> rotate(N + 90, { -YDir, XDir}).


solve([], State) -> State;
solve(([Line|Rest]), {X, Y, XWayPoint, YWayPoint}) ->
  case Line of
    [$F | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X + XWayPoint * Num, Y + YWayPoint * Num, XWayPoint, YWayPoint});
    [$R | T] ->
      Num = list_to_integer(T),
      {NewX, NewY} = rotate(Num, {XWayPoint, YWayPoint}),
      solve(Rest, { X, Y, NewX, NewY});
    [$L | T] ->
      Num = list_to_integer(T),
      {NewX, NewY} = rotate(-Num, {XWayPoint, YWayPoint}),
      solve(Rest, { X, Y, NewX, NewY});
    [$E | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X, Y, XWayPoint + Num, YWayPoint});
    [$N | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X , Y, XWayPoint, YWayPoint + Num});
    [$S | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X , Y, XWayPoint, YWayPoint - Num});
    [$W | T] ->
      Num = list_to_integer(T),
      solve(Rest, { X, Y, XWayPoint - Num, YWayPoint})
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

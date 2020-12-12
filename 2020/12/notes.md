Ok the example I stole from stack overflow was wrong:


readlines(FileName) ->
    {ok, Device} = file:open(FileName, [read]),
    try get_all_lines(Device)
      after file:close(Device)
    end.

get_all_lines(Device) ->
    case io:get_line(Device, "") of
        eof  -> [];
        Line -> Line ++ get_all_lines(Device)
    end.

this gives you a string containing all the content of the files.
If you want a list of all the lines you need to do

get_all_lines(Device) ->
    case io:get_line(Device, "") of
        eof  -> [];
                | this needs to be an array
                |
                v
        Line -> [Line] ++ get_all_lines(Device)
    end.


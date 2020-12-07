contains_shiny_gold(X) :- contains(X, []), false.

contains_shiny_gold(X) :- contains(X, [[_, shiny_gold] | _]).
contains_shiny_gold(X) :- contains(X, [[_, T] | _]), contains_shiny_gold(T).
contains_shiny_gold(X) :- contains(X, [_ | L]), member([_, Y], L), Y == shiny_gold.
contains_shiny_gold(X) :- contains(X, [_ | L]), member([_, Y], L), contains_shiny_gold(Y).

% setof(X, contains_shiny_gold(X), K), length(K, N).


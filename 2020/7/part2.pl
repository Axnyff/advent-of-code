count_all_bags([], N) :-
  N is 0.

count_all_bags([[Count, Type]], N) :-
  bag_count(Type, N1),
  N is Count * (1 + N1).

count_all_bags([[Count, Type] | R], N) :-
  count_all_bags(R, N1),
  bag_count(Type, N2),
  N is Count * (1 + N2) + N1.

bag_count(X, N) :-
  contains(X, R),
  count_all_bags(R, N).

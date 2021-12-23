import 'dart:math';

class Pair<T1, T2> {
  final T1 a;
  final T2 b;

  Pair(this.a, this.b);
  @override
  String toString() {
    return '(${a},${b})';
  }
}

const possibles = {
  "0-0", "1-0", "2-0", "3-0", "4-0", "5-0", "6-0", "7-0", "8-0", "9-0", "10-0",
  "2-1", "4-1", "6-1", "8-1",
  "2-2", "4-2", "6-2", "8-2",
};

var initial = stringifyState({
  "2-1": "B",
  "2-2": "A",
  "4-1": "C",
  "4-2": "D",
  "6-1": "B",
  "6-2": "C",
  "8-1": "D",
  "8-2": "A",
});

var end = stringifyState({
  "2-1": "A",
  "2-2": "A",
  "4-1": "B",
  "4-2": "B",
  "6-1": "C",
  "6-2": "C",
  "8-1": "D",
  "8-2": "D",
});

String getKey(int x, int y) {
  return "${x}-${y}";
}


bool canGoToTarget(Map<String, String> state, int xstart, int xend, int ystart, int yend) {
  if (yend == 0) {
    for (var i = ystart - 1; i != yend; i -= 1) {
      if (state.containsKey(getKey(xstart, i))) {
        return false;
      }
    }

    if (xstart > xend) {
      for (var i = xend; i <= xstart; i++) {
        if (state.containsKey(getKey(i, 0))) {
          return false;
        }
      }
      return true;
    }
    for (var i = xstart; i <= xend; i++) {
      if (state.containsKey(getKey(i, 0))) {
        return false;
      }
    }
    return true;
  }
  if (xstart > xend) {
    for (var i = xend; i <= xstart; i++) {
      if (state.containsKey(getKey(i, 0))) {
        return false;
      }
    }
  } else {
    for (var i = xstart; i <= xend; i++) {
      if (state.containsKey(getKey(i, 0))) {
        return false;
      }
    }
  }
  for (var i = 0; i <= yend; i++ ) {
    if (state.containsKey(getKey(xend, i))) {
      return false;
    }
  }
  return true;
}

List<Pair<String, int>> getPossibleMoves(Map<String, String> state, String key) {
  var position = key.split("-").map(( el ) => int.parse(el)).toList();
  var x = position[0];
  var y = position[1];
  var amphipod = state[key] ?? "A";
  var room = getRoom(amphipod);

  var roomIsValid =
    ((state["${room}-1"] ?? amphipod) == amphipod) &&
    ((state["${room}-2"] ?? amphipod) == amphipod);

  var diff = room - x;
  if (y == 0) {
    if (!roomIsValid) {
      return [];
    }
    if (canGoToTarget(state, x, room, y, 2)) {
      return [Pair(getKey(room, 2), (diff.abs() + 2) * getCost(amphipod))];
    }
    if (canGoToTarget(state, x, room, y, 1)) {
      return [Pair(getKey(room, 1), (diff.abs() + 1) * getCost(amphipod))];
    }
    return [];
  }
  var result = <Pair<String, int>>[];
  for (var i in [0, 1, 3, 5, 7, 9, 10]) {
    if (canGoToTarget(state, x, i, y, 0)) {
      var cost = getCost(amphipod) * ((x - i).abs() + y);
      result.add(Pair(getKey(i, 0), cost));
    }
  }
  return result;
}


int getRoom(String amphipod) {
  if (amphipod == "A") {
    return 2;
  }
  if (amphipod == "B") {
    return 4;
  }
  if (amphipod == "C") {
    return 6;
  }
  return 8;
}

int getCost(String amphipod) {
  if (amphipod == "A") {
    return 1;
  }
  if (amphipod == "B") {
    return 10;
  }
  if (amphipod == "C") {
    return 100;
  }
  return 1000;
}

String stringifyState(Map<String, String> state) {
  var keys = state.keys.toList();
  keys.sort();
  var string = keys.map((key) => "${key}=>${state[key]}").join(",");
  return string;
}

Map<String, String> parseState(String rawState) {
  var result = new Map<String, String>();
  var items = rawState.split(",");
  for (final item in items) {
    var elem = item.split("=>");
    result[elem[0]] = elem[1];
  }
  return result;
}


var dp = {initial: 0};
var toExplore = {initial};
void main() {
  var iter = 0;
  while (toExplore.length != 0 && dp[end] == null) {
    iter++;
    var newToExplore = new Set<String>();
    for (final rawState in toExplore) {
      var cost = dp[rawState] ?? 0;
      var state = parseState(rawState);
      for (final pos in state.keys) {
        var amphipod = state[pos] ?? "A";
        for (final move in getPossibleMoves(state, pos)) {
          var newState = new Map<String, String>.from(state);
          newState.remove(pos);
          newState.putIfAbsent(move.a, () => amphipod);
          var string = stringifyState(newState);
          if (dp.containsKey(string)) {
            var newCost = min(dp[string] ?? 0, cost + move.b);
            dp[string] = newCost;
          } else {
            dp[string] = cost + move.b;
            newToExplore.add(string);
          }
        }
      }
    }
    toExplore = newToExplore;
  }
  print("Go");
  print(dp[end]);
  for (final item in dp.values) {
    print(item);
  }
  var values = dp.values.toList();
  values.sort();
  print(values.last);
}

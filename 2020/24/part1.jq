$data | split("\n") | .[0:-1] | {key: .[], pos: [0, 0]} |
  [while(.key != "";
    if (.key | test("^e")) then {key: .key[1:], pos: [.pos[0], .pos[1] + 1]}
    elif (.key | test("^w")) then {key: .key[1:], pos: [.pos[0], .pos[1] - 1]}
    elif (.key | test("^se")) then {key: .key[2:], pos: [.pos[0] - 0.5, .pos[1] + 0.5]}
    elif (.key | test("^sw")) then {key: .key[2:], pos: [.pos[0] - 0.5, .pos[1] - 0.5]}
    elif (.key | test("^nw")) then {key: .key[2:], pos: [.pos[0] + 0.5, .pos[1] - 0.5]}
    else {key: .key[2:], pos: [.pos[0] + 0.5, .pos[1] + 0.5]} end
  )] | last | .pos

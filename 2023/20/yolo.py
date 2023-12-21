f = open("input", "r+")
lines = f.read().strip().splitlines()
labels = {}
for line in lines:
    label, _ = line.split(" -> ")
    labels[label[1:]] = label

graph = {}
for line in lines:
    src, dsts = line.split(" -> ")
    dsts = dsts.split(", ")
    graph[src] = [(labels[dst] if dst in labels else dst) for dst in dsts]

print(graph)
p2 = 1
for ff in graph["broadcaster"]:
    b = ""
    while True:
        b += "1" if any(dst.startswith("&") for dst in graph[ff]) else "0"
        next_ff = [dst for dst in graph[ff] if dst.startswith("%")]
        if not next_ff:
            break
        ff = next_ff[0]
    p2 *= int("".join(reversed(b)), 2)
print(p2)

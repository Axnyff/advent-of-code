with open("input") as f:
    raw = f.readlines()
    data = []
    for line in raw:
        [start, end] = line.split(" -> ")
        [a, b] = start.split(",")
        [c, d] = end.split(",")
        data.append(((int(a), int(b)), (int(c), int(d))))

    counts = {}

    for (start, end) in data:
        (x1, y1) = start
        (x2, y2) = end
        if x1 == x2:
            for i in range(min(y1, y2), max(y1, y2) + 1):
                if (x1, i) in counts:
                    counts[(x1, i)] = counts[(x1, i)]  + 1
                else:
                    counts[(x1, i)] = 1
        if y1 == y2:
            for i in range(min(x1, x2), max(x1, x2) + 1):
                if (i, y1) in counts:
                    counts[(i, y1)] = counts[(i, y1)]  + 1
                else:
                    counts[(i, y1)] = 1
    total = 0
    for item in counts:
        if counts[item] >= 2:
            total += 1
    print(total)

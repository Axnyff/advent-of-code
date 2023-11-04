from collections import *
import itertools
import random
import sys
import re

f = open("test-input").read().strip("\n")

d = {
    "N": (0, -1),
    "E": (1, 0),
    "S": (0, 1),
    "W": (-1, 0)
}

positions = []
x, y = 0, 0
m = defaultdict(set)
prev_x, prev_y = x, y
distances = defaultdict(int)
dist = 0
for c in f[1:-1]:
    print(distances)
    if c == "(":
        positions.append((x, y))
    elif c == ")":
        x, y = positions.pop()
    elif c == "|":
        x, y = positions[-1]
    else:
        dx, dy = d[c]
        x += dx
        y += dy
        if distances[(x, y)] != 0:
            print(x, y)
            distances[(x, y)] = min(distances[(x, y)], distances[(prev_x, prev_y)]+1)
        else:
            distances[(x, y)] = distances[(prev_x, prev_y)]+1





    prev_x, prev_y = x, y
# print(distances)
# print(max(distances.values()))
# print(len([x for x in distances.values() if x >= 1000]))

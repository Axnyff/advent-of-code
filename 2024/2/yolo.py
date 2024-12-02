
"""
--- Day 2: Red-Nosed Reports ---
"""

def check_levels(levels, increasing=True):
    for i in range(len(levels) - 1):
        diff = levels[i+1] - levels[i]
        if (increasing and (diff <= 0 or not (1 <= diff <= 3))) or \
           (not increasing and (diff >= 0 or not (1 <= abs(diff) <= 3))):
            return False
    return True

def part_one(filename):
    nb_safe_reports = 0

    with open(filename) as file:
        for line in file:
            levels = [int(l) for l in line.strip().split()]
            if check_levels(levels, increasing=True) or check_levels(levels, increasing=False):
                  nb_safe_reports += 1

    return nb_safe_reports

print(part_one("input"))

def is_safe(levels):
    return check_levels(levels, increasing=True) or check_levels(levels, increasing=False)

def is_safe_with_dampener(levels):
    if is_safe(levels):
        return True

    for i in range(len(levels)):
        modified_levels = levels[:i] + levels[i+1:]
        if is_safe(modified_levels):
            return True

    return False

def part_two(filename):
    nb_safe_reports = 0

    with open(filename) as file:
        for line in file:
            levels = [int(l) for l in line.strip().split()]
            if is_safe_with_dampener(levels):
                  print(True)
                  nb_safe_reports += 1
            else:
                  print(False)

    return nb_safe_reports

print(part_two("input"))

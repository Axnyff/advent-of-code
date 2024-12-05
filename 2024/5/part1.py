with open("input", "r") as f:
    data = f.read().strip();

prev = {}
[start, end] = data.split("\n\n")
for item in start.split("\n"):
    [a, b] = item.split("|")
    prev[a] = prev.get(a, [])
    prev[a].append(b)

def isInvalid(numbers):
    for (i,v) in enumerate(numbers[1:]):
        for j in range(i + 1):
            if str(numbers[j]) in prev.get(str(v), []):
                return False
    return True

count = 0
for rule in end.split("\n"):
    numbers = [int(a) for a in rule.split(",")]
    if (isInvalid(numbers)):
        count += numbers[((len(numbers) + 1) // 2) - 1]
print(count)

def sortNumbers(numbers):
    sorted = False
    while not sorted:
        sorted = True
        for i in range(len(numbers)):
            j = i + 1
            if j < len(numbers) and str(numbers[i]) in prev.get(str(numbers[j]), []):
                sorted = False
                (numbers[i], numbers[j]) = (numbers[j], numbers[i])
    return numbers

count = 0
for rule in end.split("\n"):
    numbers = [int(a) for a in rule.split(",")]
    if (not isInvalid(numbers)):
        numbers = sortNumbers(numbers)
        count += numbers[((len(numbers) + 1) // 2) - 1]
print(count)

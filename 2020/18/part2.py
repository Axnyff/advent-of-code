import re

def tokenize(input_str):
    modified_str = "(((("
    for char in input_str.strip():
        if char == "(":
            modified_str += "(((("
        elif char == ")":
            modified_str += "))))"
        elif char == "+":
            modified_str += "))+(("
        elif char == "*":
            modified_str += ")))*((("
        else:
            modified_str += char
    modified_str += "))))"
    return re.findall(r'(\d+|[*+()])', modified_str)

class Evaluator: 
    def __init__(self, expr):
        self.tokens = tokenize(expr)

    def evaluateOperand(self):
        token = self.tokens.pop(0)
        if (token == "("):
            return self.evaluate()
        return int(token)

    def evaluateOperator(self):
        op = self.tokens.pop(0)
        if op == "+":
            return lambda a,b: a + b
        return lambda a,b: a * b

    def evaluate(self):
        firstValue = self.evaluateOperand()
        while (len(self.tokens) != 0 and self.tokens[0] != ')'):
            operator = self.evaluateOperator()
            secondValue = self.evaluateOperand()
            firstValue = operator(firstValue, secondValue)

        if (len(self.tokens)):
            self.tokens.pop(0)

        return firstValue


with open("input", "r+") as f:
    total = 0
    for line in f.readlines():
        total += Evaluator(line).evaluate()
    print(total)


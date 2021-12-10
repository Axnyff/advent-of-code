#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

char closing(char c) {
  switch (c) {
    case '(':
      return ')';
    case '[':
      return ']';
    case '<':
      return '>';
    case '{':
      return '}';
  }
  return EOF;
}

int cost(char c) {
  switch (c) {
    case ')':
      return 3;
    case ']':
      return 57;
    case '}':
      return 1197;
    case '>':
      return 25137;
  }
  return 0;
}

bool isOpening(char c) {
  return closing(c) != EOF;
}

int score(FILE *fp) {
  char* data = malloc(1000);
  char* orders = data;
  *orders = '-';
  int result = 0;
  char c;
  while (c != EOF) {
    c = getc(fp);
    if (isOpening(c)) {
      orders++;
      *orders = c;
    } else {
      char top = *orders;
      if (c == closing(top)) {
        orders--;
      } else {
        result += cost(c);
        data = malloc(1000);
        orders = data;
        *orders = '-';
        while (c != '\n' && c != EOF) {
          c = getc(fp);
        }
      }
    }
  }

  return result;
}

int main() {
  FILE *fp = fopen("input", "r+");

  int result = score(fp);

  printf("%d\n", result);
}

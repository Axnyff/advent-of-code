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

char opening(char c) {
  switch (c) {
    case ')':
      return '(';
    case ']':
      return '[';
    case '>':
      return '<';
    case '}':
      return '{';
  }
  return EOF;
}

bool isOpening(char c) {
  return closing(c) != EOF;
}

long getCompleteScore(char *orders) {
  long score = 0;
  while (*orders != '-') {
    score *= 5;
    switch (*orders) {
      case '(':
        score += 1;
        break;
      case '[':
        score += 2;
        break;
      case '{':
        score += 3;
        break;
      case '<':
        score += 4;
        break;
    }
    orders--;
  }
  return score;
}

//STOLEN
long compare( const void* a, const void* b)
{
     long int_a = * ( (long*) a );
     long int_b = * ( (long*) b );

     if ( int_a == int_b ) return 0;
     else if ( int_a < int_b ) return -1;
     else return 1;
}

long score(FILE *fp) {
  char* data = malloc(1000);
  long nums[1000];
  long nums_length = 0;
  char* orders = data;
  *orders = '-';
  long result = 0;
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
        // INCOMPLETE LINE
        if (c == '\n') {
          nums_length++;
          nums[nums_length - 1] = getCompleteScore(orders);
        }

        data = malloc(1000);
        orders = data;
        *orders = '-';
        while (c != '\n' && c != EOF) {
          c = getc(fp);
        }
      }
    }
  }
  qsort(nums, nums_length, sizeof(long), compare );
  return nums[(nums_length - 1) / 2];
}

int main() {
  FILE *fp = fopen("input", "r+");

  long result = score(fp);

  printf("%ld\n", result);
}

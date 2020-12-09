#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define TARGET 22406676

int main() {
  FILE *fp = fopen("input", "r+");
  int nbNumbers = 0;

  char c;
  while (c != EOF) {
    c = getc(fp);
    if (c == '\n') {
      nbNumbers++;
    }
  }

  int *numbers = malloc(nbNumbers * sizeof(int));
  rewind(fp);

  int i;
  for (i = 0; i < nbNumbers; i++) {
    int number;
    fscanf(fp, "%d", &number);

    numbers[i] = number;
  }

  long total = 0;
  int start = 0;
  int end = 0;
  for (start = 0; start < nbNumbers; start++) {
    outer:
    total = 0;
    for (end = start; end < nbNumbers; end++) {
      total += numbers[end];
      if (total == TARGET && start != end) {
        goto end;
      }
      if (total > TARGET) {
        start++;
        goto outer;
      }
    }
  }
  end:; // beautiful syntax right here

  printf("%ld %d %d \n", total, start, end);
  int min = TARGET;
  int max = 0;
  total = 0;
  for (i = start; i <= end; i++) {
    int number = numbers[i];
    printf("%d %d %d \n", number, min, max);
    total += number;
    if (number > max) {
      max = number;
    } else if (number < min) {
      min = number;
    }
  }
  printf("%ld \n", total);
  printf("%d \n", min + max);
}

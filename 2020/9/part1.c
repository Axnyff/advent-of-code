#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define NUMBER_COUNT 25

bool isValid(int *numbers, int target);

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

  for (i = 0; i < nbNumbers - NUMBER_COUNT; i++) {
    int target = numbers[NUMBER_COUNT + i];
    bool valid = isValid(numbers + i, target);
    if (!valid) {
      printf("%d\n", target);
      break;
    }
  }
}

bool isValid(int *numbers, int target) {
  int i, j;
  for (i = 0; i < NUMBER_COUNT; i++) {
    for (j = i + 1; j < NUMBER_COUNT; j++) {
      if (numbers[i] + numbers[j] == target) {
        return true;
      }
    }
  }

  return false;

}

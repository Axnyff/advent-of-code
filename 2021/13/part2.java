import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

class Part1 {
  public static String buildKey(int x, int y) {
    return x + "," + y;
  }

  public static int getX(String input) {
    return Integer.parseInt(input.replaceAll(",\\d+$", ""));
  }

  public static int getY(String input) {
    return Integer.parseInt(input.replaceAll("\\d+,", ""));
  }


  public static void main(String[] args) throws IOException {
    Path fileName = Path.of("input");
    String content = Files.readString(fileName);

    String lines[] = content.split("\\n");


    Map<String, Boolean> dots = new HashMap<String, Boolean>();


    int lineIndex = 0;
    int xMax = 0;
    int yMax = 0;
    while (true) {
      if (!lines[lineIndex].equals("")) {
        int x = getX(lines[lineIndex]);
        int y = getY(lines[lineIndex]);
        if (x > xMax) {
          xMax = x;
        }
        if (y > yMax) {
          yMax = y;
        }
        dots.put(lines[lineIndex], true);
      } else {
        break;
      }
      lineIndex++;
    }
    lineIndex++;

    while (lineIndex < lines.length) {
      String instruction = lines[lineIndex].replace("fold along ", "");

      Boolean isHorizontal = instruction.startsWith("x");
      int position = Integer.parseInt(instruction.substring(2));

      if (!isHorizontal) {
        for (int i = 0; i <= xMax; i++) {
          for (int j = position + 1; j <= yMax; j++) {
            if (dots.containsKey(buildKey(i, j))) {
              dots.remove(buildKey(i, j));
              dots.put(buildKey(i, 2 * position - j), true);
            }
          }
        }
        yMax = position;
      } else {
        for (int i = position + 1; i <= xMax; i++) {
          for (int j = 0; j <= yMax; j++) {
            if (dots.containsKey(buildKey(i, j))) {
              dots.remove(buildKey(i, j));
              dots.put(buildKey(2 * position - i, j), true);
            }
          }
        }
        xMax = position;
      }


      lineIndex++;
    }

    for (int j = 0; j <= yMax; j++) {
      for (int i = 0; i <= xMax; i++) {
        if (dots.containsKey(buildKey(i, j))) {
          System.out.print("#");
        } else {
          System.out.print(".");
        }
      }
      System.out.println("");
    }
  }
}

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

class Part1 {
  public static String buildKey(Integer x, Integer y) {
    return x.toString() + "," + y.toString();
  }

  public static void main(String[] args) throws IOException {
    Path fileName = Path.of("test-input");
    String content = Files.readString(fileName);

    Map<String, Boolean> dots = new HashMap<String, Boolean>();
    System.out.println(content); 
  }
}

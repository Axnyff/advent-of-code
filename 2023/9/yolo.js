function decode(message) {
  // Code here
  const subFunc = (message, reverse) => {
    let result = [];
    for (let i = 0; i < message.length; i++) {
      console.log(i, message[i]);
      if (message[i] !== "(") {
        result.push(message[i]);
        continue;
      }
      if (message[i] === "(") {
        let parenCount = 1;
        let j = i;
        while (parenCount !== 0) {
          console.log("looping");
          j++;
          if (message[j] === ")") {
            parenCount--;
          }
          if (message[j] === "(") {
            parenCount++;
          }
        }
        result.push(subFunc(message.slice(i + 1, j), true));
        i = j;
      }
    }
    if (reverse) {
      return result.join("").split("").reverse().join("");
    }
    return result;
  };
  return subFunc(message, false);
}
console.log(decode("(olleh) (dlrow)!"));

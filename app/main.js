import fs from "fs";

const args = process.argv.slice(2); // Skip the first two arguments (node path and script path)

if (args.length < 2) {
  console.error("Usage: ./your_program.sh tokenize <filename>");
  process.exit(1);
}

const command = args[0];

if (command !== "tokenize") {
  console.error(`Usage: Unknown command: ${command}`);
  process.exit(1);
}

const filename = args[1];

const fileContent = fs.readFileSync(filename, "utf8");

if (fileContent.length !== 0) {
  let lines = fileContent.split("\n");

  lines.forEach((line, index) => {
    var token = "";
    var hasError = false;
    for (const ch of line) {
      switch (ch) {
        case "(":
          token += "LEFT_PAREN ( null\n";
          break;
        case ")":
          token += "RIGHT_PAREN ) null\n";
          break;
        case "{":
          token += "LEFT_BRACE { null\n";
          break;
        case "}":
          token += "RIGHT_BRACE } null\n";
          break;
        case ",":
          token += "COMMA , null\n";
          break;
        case ".":
          token += "DOT . null\n";
          break;
        case "-":
          token += "MINUS - null\n";
          break;
        case "+":
          token += "PLUS + null\n";
          break;
        case ";":
          token += "SEMICOLON ; null\n";
          break;
        case "*":
          token += "STAR * null\n";
          break;
        default:
          console.error(
            `[line ${index + 1}] Error: Unexpected character: ${ch}`
          );
          hasError = true;
          break;
      }
    }
    token += "EOF  null";
    console.log(token);
    if (hasError) {
      process.exit(65);
    }
  });
} else {
  console.log("EOF  null");
}

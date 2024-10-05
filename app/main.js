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
  for (var i = 0; i < fileContent.length; i++) {
    switch (fileContent[i]) {
      case "(":
        console.log("LEFT_PAREN ( null");
        continue;
      case ")":
        console.log("RIGHT_PAREN ) null");
        continue;
      case "{":
        console.log("LEFT_BRACE { null");
        continue;
      case "}":
        console.log("RIGHT_BRACE } null");
        continue;
      default:
        continue;
    }
  }
  console.log("EOF  null");
} else {
  console.log("EOF  null");
}

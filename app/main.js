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

const Tokens = {
  LEFT_PAREN: "LEFT_PAREN",
  RIGHT_PAREN: "RIGHT_PAREN",
  LEFT_BRACE: "LEFT_BRACE",
  RIGHT_BRACE: "RIGHT_BRACE",
  COMMA: "COMMA",
  DOT: "DOT",
  MINUS: "MINUS",
  PLUS: "PLUS",
  SEMICOLON: "SEMICOLON",
  STAR: "STAR",
  EOF: "EOF",
  BANG: "BANG",
  BANG_EQUAL: "BANG_EQUAL",
  EQUAL: "EQUAL",
  EQUAL_EQUAL: "EQUAL_EQUAL",
  GREATER: "GREATER",
  GREATER_EQUAL: "GREATER_EQUAL",
  LESS: "LESS",
  LESS_EQUAL: "LESS_EQUAL",
  SLASH: "SLASH",
};

var tokens = [];
var hasError = false;

function printToken(token) {
  console.log(
    `${token.token_type} ${token.lexeme} ${
      token.literal ? token.literal : "null"
    }`
  );
}

if (fileContent.length !== 0) {
  let lines = fileContent.split("\n");
  for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[i].length; j++) {
      const ch = lines[i][j];
      var foundComment = false;
      switch (ch) {
        case "(":
          tokens.push({
            token_type: Tokens.LEFT_PAREN,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case ")":
          tokens.push({
            token_type: Tokens.RIGHT_PAREN,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case "{":
          tokens.push({
            token_type: Tokens.LEFT_BRACE,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case "}":
          tokens.push({
            token_type: Tokens.RIGHT_BRACE,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case ",":
          tokens.push({
            token_type: Tokens.COMMA,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case ".":
          tokens.push({
            token_type: Tokens.DOT,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case "-":
          tokens.push({
            token_type: Tokens.MINUS,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case "+":
          tokens.push({
            token_type: Tokens.PLUS,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case ";":
          tokens.push({
            token_type: Tokens.SEMICOLON,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case "*":
          tokens.push({
            token_type: Tokens.STAR,
            lexeme: ch,
            literal: null,
            line: i,
          });
          break;
        case "!":
          if (j != lines[i].length - 1 && lines[i][j + 1] == "=") {
            tokens.push({
              token_type: Tokens.BANG_EQUAL,
              lexeme: lines[i][j] + lines[i][j + 1],
              literal: null,
              line: i,
            });
            j++;
          } else {
            tokens.push({
              token_type: Tokens.BANG,
              lexeme: ch,
              literal: null,
              line: i,
            });
          }
          break;
        case "=":
          if (j != lines[i].length - 1 && lines[i][j + 1] == "=") {
            tokens.push({
              token_type: Tokens.EQUAL_EQUAL,
              lexeme: lines[i][j] + lines[i][j + 1],
              literal: null,
              line: i,
            });
            j++;
          } else {
            tokens.push({
              token_type: Tokens.EQUAL,
              lexeme: ch,
              literal: null,
              line: i,
            });
          }
          break;
        case ">":
          if (j != lines[i].length - 1 && lines[i][j + 1] == "=") {
            tokens.push({
              token_type: Tokens.GREATER_EQUAL,
              lexeme: lines[i][j] + lines[i][j + 1],
              literal: null,
              line: i,
            });
            j++;
          } else {
            tokens.push({
              token_type: Tokens.GREATER,
              lexeme: ch,
              literal: null,
              line: i,
            });
          }
          break;
        case "<":
          if (j != lines[i].length - 1 && lines[i][j + 1] == "=") {
            tokens.push({
              token_type: Tokens.LESS_EQUAL,
              lexeme: lines[i][j] + lines[i][j + 1],
              literal: null,
              line: i,
            });
            j++;
          } else {
            tokens.push({
              token_type: Tokens.LESS,
              lexeme: ch,
              literal: null,
              line: i,
            });
          }
          break;
        case "/":
          if (j != lines[i].length - 1 && lines[i][j + 1] == "/") {
            foundComment = true;
          } else {
            tokens.push({
              token_type: Tokens.SLASH,
              lexeme: ch,
              literal: null,
              line: i,
            });
          }
          break;
        case " ":
        case "\r":
        case "\t":
          // Ignore whitespace.
          break;
        default:
          console.error(`[line ${i + 1}] Error: Unexpected character: ${ch}`);
          hasError = true;
          break;
      }
      if (foundComment) {
        break;
      }
    }
  }
  tokens.push({
    token_type: Tokens.EOF,
    lexeme: "",
    literal: null,
    line: i,
  });

  tokens.forEach((token) => {
    printToken(token);
  });
  if (hasError) {
    process.exit(65);
  }
} else {
  console.log("EOF  null");
}

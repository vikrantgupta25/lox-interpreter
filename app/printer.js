import "./expression.js";

export class Visitor {
  accept() {
    console.log("visitor not implemented for this expression class!");
  }
}

export class ASTPrinter extends Visitor {
  print(expression) {
    expression.accept(this);
  }

  visitBinaryExpression(expression) {
    console.log(expression, "visited from binary expression");
  }

  visitUnaryExpression() {}

  visitGroupingExpression() {}

  visitLiteralExpression() {}
}

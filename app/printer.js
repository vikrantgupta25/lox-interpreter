export class Visitor {
  // for every new visitor we need to define the below 4 functions to map them correctly to their classes
  visitBinaryExpression() {
    console.log("visit binary expression missing for the visitor");
  }
  visitUnaryExpression() {
    console.log("visit unary expression missing for the visitor");
  }
  visitGroupingExpression() {
    console.log("visit grouping expression missing for the visitor");
  }
  visitLiteralExpression() {
    console.log("visit literal expression missing for the visitor");
  }
}

export class ASTPrinter extends Visitor {
  print(expression) {
    expression.accept(this);
  }

  parenthesize(...exprs) {
    // todo[vikrantgupta25]: define the proper parenthesize function here to complete the ASTPrinter Visitor
    console.log(exprs);
  }

  visitBinaryExpression(expr) {
    this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  visitUnaryExpression() {
    this.parenthesize(expr.operator.lexeme, expr.right);
  }

  visitGroupingExpression(expr) {
    this.parenthesize("group", expr.expression);
  }

  visitLiteralExpression() {
    if (expr.value == null) return "nil";
    return expr.value.toString();
  }
}

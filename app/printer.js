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
    return expression.accept(this);
  }

  parenthesize(name, ...exprs) {
    var resultExpression = `(${name}`;
    exprs.forEach((exp) => {
      resultExpression += ` ${exp.accept(this)}`;
    });
    resultExpression += ")";
    return resultExpression;
  }

  visitBinaryExpression(expr) {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  visitUnaryExpression(expr) {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  visitGroupingExpression(expr) {
    return this.parenthesize("group", expr.expression);
  }

  visitLiteralExpression(expr) {
    if (expr.value == null) return "nil";
    return expr.value.toString();
  }
}

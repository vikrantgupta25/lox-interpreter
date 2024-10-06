class Expression {
  accept() {
    console.log("accept function not implemented! default function running");
  }
}

export class BinaryExpression extends Expression {
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept(visitor) {
    visitor.visitBinaryExpression(this);
  }
}

export class UnaryExpression extends Expression {
  constructor(operator, right) {
    super();
    this.operator = operator;
    this.right = right;
  }
  accept(visitor) {
    visitor.visitUnaryExpression(this);
  }
}

export class Grouping extends Expression {
  constructor(expression) {
    super();
    this.expression = expression;
  }
  accept(visitor) {
    visitor.visitGroupingExpression(this);
  }
}

export class Literal extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
  accept(visitor) {
    visitor.visitLiteralExpression(this);
  }
}

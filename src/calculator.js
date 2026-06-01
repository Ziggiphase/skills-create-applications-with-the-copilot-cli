#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), exponentiation (^ or **), square root (sqrt).
const supportedOperatorList = ["+", "-", "*", "/", "%", "^", "**", "sqrt"];
const supportedOperators = new Set(supportedOperatorList);

function assertFiniteOperands(left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be valid numbers.");
  }
}

function assertFiniteOperand(value) {
  if (!Number.isFinite(value)) {
    throw new Error("Operand must be a valid number.");
  }
}

function modulo(a, b) {
  assertFiniteOperands(a, b);

  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  assertFiniteOperands(base, exponent);
  return base ** exponent;
}

function squareRoot(n) {
  assertFiniteOperand(n);

  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

function calculate(left, operator, right) {
  if (!supportedOperators.has(operator)) {
    throw new Error(
      `Unsupported operator "${operator}". Use one of: ${supportedOperatorList.join(", ")}`
    );
  }

  if (operator === "sqrt") {
    return squareRoot(left);
  }

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be valid numbers.");
  }

  if (operator === "/" && right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "%":
      return modulo(left, right);
    case "^":
    case "**":
      return power(left, right);
    default:
      throw new Error("Unexpected operator.");
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const [firstArg, secondArg, thirdArg] = args;
  let leftArg;
  let operator;
  let rightArg;

  if (args.length === 2 && firstArg === "sqrt") {
    operator = "sqrt";
    leftArg = secondArg;
  } else if (args.length === 3) {
    leftArg = firstArg;
    operator = secondArg;
    rightArg = thirdArg;
  } else {
    console.error("Usage:");
    console.error("  node src/calculator.js <number> <operator> <number>");
    console.error("  node src/calculator.js sqrt <number>");
    console.error("Examples:");
    console.error("  node src/calculator.js 8 * 3");
    console.error("  node src/calculator.js sqrt 9");
    process.exit(1);
  }

  const left = Number(leftArg);
  const right = rightArg === undefined ? undefined : Number(rightArg);

  try {
    const result = calculate(left, operator, right);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { calculate, modulo, power, squareRoot };

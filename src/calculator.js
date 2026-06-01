#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/).
const supportedOperators = new Set(["+", "-", "*", "/"]);

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Both operands must be valid numbers.");
  }

  if (!supportedOperators.has(operator)) {
    throw new Error(`Unsupported operator "${operator}". Use one of: +, -, *, /`);
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
    default:
      throw new Error("Unexpected operator.");
  }
}

if (require.main === module) {
  const [leftArg, operator, rightArg] = process.argv.slice(2);

  if (!leftArg || !operator || !rightArg) {
    console.error("Usage: node src/calculator.js <number> <operator> <number>");
    console.error("Example: node src/calculator.js 8 * 3");
    process.exit(1);
  }

  const left = Number(leftArg);
  const right = Number(rightArg);

  try {
    const result = calculate(left, operator, right);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { calculate };

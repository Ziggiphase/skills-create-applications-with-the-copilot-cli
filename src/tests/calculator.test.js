const { calculate, modulo, power, squareRoot } = require("../calculator");

describe("calculate", () => {
  test.each([
    [2, "+", 3, 5],
    [10, "-", 4, 6],
    [45, "*", 2, 90],
    [20, "/", 5, 4],
    [5, "%", 2, 1],
    [10, "%", 3, 1],
    [2, "^", 3, 8],
    [2, "**", 4, 16],
    [-7, "+", 2, -5],
    [9, "-", 12, -3],
  ])("calculates %s %s %s = %s", (left, operator, right, expected) => {
    expect(calculate(left, operator, right)).toBe(expected);
  });

  it("calculates square roots", () => {
    expect(calculate(9, "sqrt")).toBe(3);
    expect(calculate(16, "sqrt")).toBe(4);
  });

  it("throws when dividing by zero", () => {
    expect(() => calculate(10, "/", 0)).toThrow("Division by zero is not allowed.");
  });

  it("throws when modulo by zero", () => {
    expect(() => calculate(10, "%", 0)).toThrow("Modulo by zero is not allowed.");
  });

  it("throws when using an unsupported operator", () => {
    expect(() => calculate(2, "@", 3)).toThrow('Unsupported operator "@"');
  });

  it("throws when operands are not valid numbers", () => {
    expect(() => calculate(Number.NaN, "+", 3)).toThrow("Both operands must be valid numbers.");
  });
});

describe("calculator helpers", () => {
  it("computes modulo", () => {
    expect(modulo(20, 6)).toBe(2);
  });

  it("computes power", () => {
    expect(power(3, 2)).toBe(9);
  });

  it("computes square root", () => {
    expect(squareRoot(16)).toBe(4);
  });

  it("throws on square root of a negative number", () => {
    expect(() => squareRoot(-1)).toThrow("Square root of a negative number is not allowed.");
  });
});

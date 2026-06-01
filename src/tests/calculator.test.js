const { calculate } = require("../calculator");

describe("calculate", () => {
  test.each([
    [2, "+", 3, 5],
    [10, "-", 4, 6],
    [45, "*", 2, 90],
    [20, "/", 5, 4],
    [-7, "+", 2, -5],
    [9, "-", 12, -3],
  ])("calculates %s %s %s = %s", (left, operator, right, expected) => {
    expect(calculate(left, operator, right)).toBe(expected);
  });

  it("throws when dividing by zero", () => {
    expect(() => calculate(10, "/", 0)).toThrow("Division by zero is not allowed.");
  });

  it("throws when using an unsupported operator", () => {
    expect(() => calculate(2, "^", 3)).toThrow('Unsupported operator "^"');
  });

  it("throws when operands are not valid numbers", () => {
    expect(() => calculate(Number.NaN, "+", 3)).toThrow("Both operands must be valid numbers.");
  });
});

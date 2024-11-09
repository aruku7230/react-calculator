import Keys from './Keys';

class Calculation {
  static addKeyToOperand(operand, key) {
    if (! Keys.isDigitKey(key) && ! Keys.isDecimalPointKey(key)) return operand;

    let newOperand = "";
    if (key === Keys.DigitKey0 && operand === "0") {
      newOperand = operand;
    } else if (key === Keys.DecimalPointKey && operand?.includes(".")) {
      newOperand = operand;
    } else {
      newOperand = `${operand ?? ""}${key}`;
    }

    return newOperand;
  }

  static calculate(operandLeft, operandRight, operator) {
    const left = parseFloat(operandLeft);
    const right = parseFloat(operandRight);

    if (isNaN(left) || isNaN(right)) return "";

    let computation = "";
    switch (operator) {
      case Keys.OperatorKeyAdd:
        computation = left + right;
        break
      case Keys.OperatorKeySubtract:
        computation = left - right;
        break
      case Keys.OperatorKeyMutiply:
        computation = left * right;
        break
      case Keys.OperatorKeyDivide:
        computation = left / right;
        break
      default:
        throw Error(`Invalid operator: ${operator}`)
    }

  return computation.toString()

  }
}

export default Calculation;
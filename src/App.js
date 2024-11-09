import { useReducer } from "react"
import KeyButton from "./KeyButton"
import Keys from "./Keys"
import Calculation from "./Calculation"
import "./styles.css"

function isEmptyOrNull(str) {
  return str === null || str === undefined || str === "";
}

const INITIAL_STATE = {
  previousOperand: "",
  currentOperand: "",
  operator: "",
  evaluated: false
}

function reducer(state, { key }) {
  let {previousOperand, currentOperand, operator, evaluated} = state;

  if(Keys.isDigitKey(key) || Keys.isDecimalPointKey(key)) {
    currentOperand = Calculation.addKeyToOperand(state.currentOperand, key);

    // After evaluated last expression, start new expression
    if (evaluated) {
      currentOperand = key;
      evaluated = false;
    }

    return {
      ...state,
      evaluated,
      currentOperand,
    };
  } else if (Keys.isOperatorKey(key)) {
    /* 
    cases:
    - [start] -> operator
    - [start] -> currentOperand -> operator
    - [start] -> previousOperand -> operator -> operator
    - [start] -> previousOperand -> operator -> currentOperand -> operator
    - [start] -> previousOperand -> operator -> currentOperand -> operator -> operator
    */

    if (isEmptyOrNull(previousOperand) && isEmptyOrNull(currentOperand)) {
      // pass
    } else if (isEmptyOrNull(previousOperand)){
      operator = key;
      previousOperand = currentOperand;
      currentOperand = "";
    } else if (isEmptyOrNull(currentOperand)) {
      operator = key;
    } else {
      previousOperand = Calculation.calculate(previousOperand, currentOperand, operator);
      operator = key;
      currentOperand = "";
    }

    return {
      ...state,
      previousOperand,
      currentOperand,
      operator,
    }
  } else if (Keys.isFunctionKey(key)) {
    switch (key) {
      case Keys.FunctionKeyClear:
        return INITIAL_STATE;
      case Keys.FunctionKeyDelete:
        // after evaluation, press delete key do clear result
        if (evaluated) {
          evaluated = false;
          currentOperand = "";
        }

        currentOperand = currentOperand.slice(0, -1);

        return {
          ...state,
          currentOperand,
          evaluated
        }
      case Keys.FunctionKeyEvaluate:
        if (previousOperand && currentOperand && operator) {
          evaluated = true;
          currentOperand = Calculation.calculate(previousOperand, currentOperand, operator);
          previousOperand = "";
          operator = "";
        }

        return {
          ...state,
          previousOperand,
          currentOperand,
          operator,
          evaluated,
        };
      default:
        throw Error(`Invalid Function key: ${key}`)
    }
  } else {
    throw Error(`Invalid key: ${key}`);
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (! operand) return "";
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  )

  function handleAddKey(key) {
    dispatch({key});
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operator}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <KeyButton className="span-two" keyValue={Keys.FunctionKeyClear} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.FunctionKeyDelete} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.OperatorKeyDivide} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey1} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey2} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey3} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.OperatorKeyMutiply} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey4} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey5} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey6} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.OperatorKeyAdd} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey7} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey8} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey9} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.OperatorKeySubtract} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DecimalPointKey} onAddKey={handleAddKey} />
      <KeyButton keyValue={Keys.DigitKey0} onAddKey={handleAddKey} />
      <KeyButton className="span-two" keyValue={Keys.FunctionKeyEvaluate} onAddKey={handleAddKey} />
    </div>
  )
}

export default App

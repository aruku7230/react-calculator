class Keys {
    static DigitKey0 = "0";
    static DigitKey1 = "1";
    static DigitKey2 = "2";
    static DigitKey3 = "3";
    static DigitKey4 = "4";
    static DigitKey5 = "5";
    static DigitKey6 = "6";
    static DigitKey7 = "7";
    static DigitKey8 = "8";
    static DigitKey9 = "9";
    static DecimalPointKey = ".";
    static OperatorKeyAdd = "+";
    static OperatorKeySubtract = "-";
    static OperatorKeyMutiply = "×";
    static OperatorKeyDivide = "÷";

    static FunctionKeyDelete = "DEL";
    static FunctionKeyClear = "AC";
    static FunctionKeyEvaluate = "=";

    static isValidKey(key) {
        return this.isDigitKey(key) || this.isDecimalPointKey(key) || 
            this.isOperatorKey(key) || this.isFunctionKey();
    }

    static isDigitKey(key) {
        return [this.DigitKey0, this.DigitKey1, this.DigitKey2, this.DigitKey3, 
            this.DigitKey4, this.DigitKey5, this.DigitKey6, this.DigitKey7,
            this.DigitKey8, this.DigitKey9
        ].includes(key);
    }

    static isDecimalPointKey(key) {
        return key === this.DecimalPointKey;
    }

    static isOperatorKey(key) {
        return [this.OperatorKeyAdd, this.OperatorKeySubtract, this.OperatorKeyMutiply,
            this.OperatorKeyDivide
        ].includes(key);
    }

    static isFunctionKey(key) {
        return [this.FunctionKeyDelete, this.FunctionKeyClear, 
            this.FunctionKeyEvaluate
        ].includes(key);
    }
}

export default Keys;


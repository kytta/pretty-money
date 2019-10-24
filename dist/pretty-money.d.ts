interface FormatOptions {
    /**
     * The string to be used as currency symbol.
     *
     * It can be the respective sign (like "$"), currency code (like "GBP") or a word (like "peso").
     */
    currency?: string;
    /**
     * A string that separates the integer and the fraction parts of the number.
     */
    decimalDelimiter?: string;
    /**
     * Sets the amount of decimal places.
     *
     * - "fixed" — the amount of places will always stay at `maxDecimal`. `minDecimal` has no effect.
     * - "fluid" — the amount of places will stay at any number between `minDecimal` and `maxDecimal`, in order not to have trailing zeros.
     * - "minmax" — the amount of places will stay at `maxDecimal` unless it's possible to be at `minDecimal` without having trailing zeros.
     */
    decimals?: "fluid" | "minmax" | "fixed";
    /**
     * The maximum number of decimal places allowed in the number.
     */
    maxDecimal?: number;
    /**
     * The minimum number of decimal places allowed in the number. Has no effect when `decimals` is `"fixed"`.
     */
    minDecimal?: number;
    /**
     * Sets the position of the currency symbol with respect to the number.
     */
    position?: "before" | "after";
    /**
     * Sets whether there should be a space between the number and the currency symbol.
     */
    spaced?: boolean;
    /**
     * A string that separates the thousands of the number.
     */
    thousandsDelimiter?: string;
}
declare function prettyMoney(options: FormatOptions): Function;
declare function prettyMoney(options: FormatOptions, number: number | string): string;
export default prettyMoney;

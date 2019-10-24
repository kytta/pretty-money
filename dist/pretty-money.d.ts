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
/**
 * Returns a curried function to prettify a number according to the given format
 *
 * ## Usage
 * ```
 * > const euros = prettify({currency: "EUR"});
 * > euros("12.345")
 * 12.34 EUR
 *
 * > const rubles = prettify({
 *     currency: "₽",
 *     decimals: "fixed",
 *     decimalDelimiter: ",",
 *     thousandsDelimiter: " "
 * });
 * > rubles(56789)
 * 56 789,00 ₽
 * ```
 *
 * @param options - formatting options
 * @returns the formatting function
 */
declare function prettyMoney(options: FormatOptions): (n: number | string) => string;
/**
 * Prettifies a number according to the given format
 *
 * ## Usage
 * ```
 * > prettify({currency: "USD"}, 5);
 * 5 USD
 *
 * > prettify({
 *     currency: "₽",
 *     decimals: "fixed",
 *     decimalDelimiter: ",",
 *     thousandsDelimiter: " "
 * }, "56789.0");
 * 56 789,00 ₽
 * ```
 *
 * @param options - formatting options
 * @param number - the number to be currency-formatted
 * @returns the format results
 */
declare function prettyMoney(options: FormatOptions, number: number | string): string;
export default prettyMoney;

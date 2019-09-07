interface FormatOptions {
    /**
     * The currency name or symbol to be used in formatted string
     */
    currency?: string;
    /**
     * Indicates the place where the currency name/symbol should be located with respect to the number
     */
    position?: "before" | "after";
    /**
     * Indicates whether there should be a space between the number and the currency name/symbol
     */
    spaced?: boolean;
    /**
     * Indicates the amount of decimal places
     *
     * - "fluid" — the amount of places will stay between `minDecimal` and `maxDecimal` and will have to trailing zeros.
     * - "minmax" — the amount of places will stay at `maxDecimal` unless it's possible to be at `minDecimal`.
     * - "fixed" — the amount of places will always stay at `maxDecimal`. `minDecimal` has no effect.
     */
    decimals?: "fluid" | "minmax" | "fixed";
    /**
     * The minimum number of decimal places for the number
     */
    minDecimal?: number;
    /**
     * The maximum number of decimal places for the number
     */
    maxDecimal?: number;
    /**
     * The separator between the integer and the fraction parts of the number
     */
    decimalDelimiter?: string;
    /**
     * The separator between the thousands of the number
     */
    thousandsDelimiter?: string;
}

type prettify = {
    (options: FormatOptions, number: number|string): string;
    (options: FormatOptions): prettify_;
    (): prettify_;
}

type prettify_ = {
    (number: number|string): string;
}


/**
 * Prettifies a number according to the given format or returns a curried function to prettify any number
 *
 * ## Usage
 * ```
 * > prettify({currency: "USD"}, 5);
 * 5 USD
 *
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
 * @param number - the number to be currency-formatted
 * @returns the format results, if the number was provided, or a formatting function otherwise
 */
declare const prettify: prettify;

export = prettify;

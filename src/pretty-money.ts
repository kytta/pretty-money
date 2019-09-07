interface FormatOptions {
    /**
     * The currency name or symbol to be used in formatted string
     */
    currency?: string;

    /**
     * Indicates the place where the currency name/symbol should be located with respect to the number
     */
    position?: "before"|"after";

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
    decimals?: "fluid"|"minmax"|"fixed";

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

const defaultOpts: FormatOptions = {
    currency: "",
    position: "after",
    spaced: true,
    decimals: "minmax",
    minDecimal: 0,
    maxDecimal: 2,
    decimalDelimiter: ".",
    thousandsDelimiter: ""
};

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
function prettify(options: FormatOptions, number?: number|string): string|Function {
    const _opts: FormatOptions = {
        ...defaultOpts,
        ...options
    };

    function func(number: number|string): string {
        number = Number(number);

        if (isNaN(number)) {
            console.warn("The number input could not be interpreted");
            number = "NaN";
        } else {
            const tens = Math.pow(10, _opts.maxDecimal);
            number = (number * tens).toFixed(0);
            const splitIdx = number.length - _opts.maxDecimal;
            let decimalPart = number.slice(splitIdx);

            if (_opts.decimals === "fluid" || (_opts.decimals === "minmax" && decimalPart.match(/^0*$/))) {
                decimalPart = decimalPart.replace(/0*$/, "");
            }

            number = number.slice(0, splitIdx) + decimalPart;
        }

        return (_opts.position === "before" ? _opts.currency : "")
            + (_opts.position === "before" && _opts.spaced ? " " : "")
            + number
            + (_opts.position === "after" && _opts.spaced ? " " : "")
            + (_opts.position === "after" ? _opts.currency : "");
    }

    if (number === undefined) {
        return func;
    }

    return func(number);
}

export default prettify;

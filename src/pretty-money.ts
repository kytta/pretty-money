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
    decimals?: "fluid"|"minmax"|"fixed";

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
    position?: "before"|"after";

    /**
     * Sets whether there should be a space between the number and the currency symbol.
     */
    spaced?: boolean;

    /**
     * A string that separates the thousands of the number.
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
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const prettify: prettify = (options: FormatOptions = {}, number?: number|string) => {
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
            number = Math.floor(number * tens).toString();
            const splitIdx = number.length - _opts.maxDecimal;
            const wholePart = number.slice(0, splitIdx).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + _opts.thousandsDelimiter);
            let decimalPart = number.slice(splitIdx);

            if (_opts.decimals === "fluid" || (_opts.decimals === "minmax" && decimalPart.slice(_opts.minDecimal).match(/^0*$/))) {
                decimalPart = decimalPart.replace(/0*$/, "");
            }

            number = wholePart + (decimalPart === "" ? "" : _opts.decimalDelimiter) + decimalPart;
        }

        return (_opts.position === "before" ? _opts.currency : "")
            + (_opts.position === "before" && _opts.spaced && _opts.currency !== "" ? " " : "")
            + number
            + (_opts.position === "after" && _opts.spaced && _opts.currency !== "" ? " " : "")
            + (_opts.position === "after" ? _opts.currency : "");
    }

    if (number === undefined) {
        return func;
    }

    return func(number);
};

export default prettify;

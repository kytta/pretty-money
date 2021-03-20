/**
 * @typedef {Object} FormatOptions
 * 
 * @property {string} [currency=""] The string to be used as currency symbol.
 *
 * It can be the respective sign (like "$"), currency code (like "GBP"),
 * or a word (like "peso").
 * 
 * @property {string} [decimalDelimiter="."] The string to be used as delimiter 
 * for decimal part of the number.
 * 
 * @property {"fluid"|"minmax"|"fixed"} [decimals="minmax"] Sets the amount of
 * decimal places the number will have.
 *
 * - "fixed" — the amount of places will always stay at `maxDecimal`.
 *   `minDecimal` has no effect.
 * - "fluid" — the amount of places will stay at any number between `minDecimal`
 *   and `maxDecimal`, in order not to have trailing zeros.
 * - "minmax" — the amount of places will stay at `maxDecimal` unless it's
 *   possible to be at `minDecimal` without having trailing zeros.
 * 
 * @property {number} [maxDecimal=2] The maximum number of decimal places
 * allowed in the number.
 * 
 * @property {number} [minDecimal=2] The minimum number of decimal places
 * allowed in the number. Has no effect when `decimals` is set to `"fixed"`.
 * 
 * @property {"before"|"after"} [position="after"] Sets the position of the
 * currency symbol with respect to the number.
 * 
 * @property {boolean} [spaced=true] Sets whether there should be a space
 * between the number and the currency symbol.
 * 
 * @property {string} [thousandsDelimiter=""] A string that separates the
 * thousands of the number.
 */

/**
 * Default options for formatting.
 * 
 * @type {FormatOptions}
 */
 const defaultOpts = {
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
 * Prettifies a number according to the given format
 *
 * ## Usage
 * ```
 * > prettify({currency: "USD"}, 5);
 * "5 USD"
 *
 * > prettify({
 *     currency: "₽",
 *     decimals: "fixed",
 *     decimalDelimiter: ",",
 *     thousandsDelimiter: " "
 *   }, "56789.0");
 * "56 789,00 ₽"
 * ```
 * 
 * @param {FormatOptions} options formatting options
 * @param {number|string} number the number to be currency formatted
 * @returns {string | ((n: number|string) => string)} the format results
 */
function prettyMoney(options, number) {
  /** @type {FormatOptions} */
  const _opts = {
    ...defaultOpts,
    ...options
  };

  /**
   * Prettifies a number according to the previously defined format.
   * 
   * @param {number|string} number the number to be currency formatted
   * @returns {string} formatted number
   */
  function prettify(number) {
    number = Number(number);

    if (isNaN(number)) {
      number = "NaN";
    } else {
      const tens = Math.pow(10, _opts.maxDecimal);
      number = Math.floor(number * tens).toString();
      const splitIdx = number.length - _opts.maxDecimal;
      const wholePart = number.slice(0, splitIdx).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + _opts.thousandsDelimiter);
      let decimalPart = number.slice(splitIdx);

      if (_opts.decimals === "fluid" || (_opts.decimals === "minmax" && decimalPart.slice(_opts.minDecimal).match(/^0*$/))) {
          decimalPart = decimalPart.slice(0, _opts.minDecimal) + decimalPart.slice(_opts.minDecimal).replace(/0*$/, "");
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
    return prettify;
  }

  return prettify(number);
}

export default prettyMoney;

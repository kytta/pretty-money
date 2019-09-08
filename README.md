# pretty-money

A tiny currency formatting library for JavaScript.

- **Small.** Dependency-free. 559 bytes minified and gzipped. Controlled by [Size Limit](https://github.com/ai/size-limit).
- **Functional.** The function can be used traditionally or curried for later reuse.
- **Flexible.** The config can be tweaked to present any modern currency.

```js
import prettyMoney from "pretty-money";
let price = prettyMoney({ currency: "EUR" }, 10000); //=> "10000 EUR"
```

### [Demo](https://os.karamoff.ru/pretty-money#demo)

Works everywhere where there is support for ES3.

----

## Difference from toLocaleString

ECMAScript's `Number` has a method `toLocaleString`, which has a similar idea. It too can be used to format numbers as
financial values and it even has built-in locales, however the output of the function is different on different Node
versions and browsers.

```js
let price = (10000).toLocaleString("ru", {
    style: "currency",
    currency: "RUB"
});

console.log(price); //=> "10 000 ₽" on Node < 12.something
console.log(price); //=> "10,000.00 RUB" on Node >= 12.something
```

While pretty-money doesn't have any locales built-in, it provides a better API, so that the end user can compose any
currency formatting function they need.

```js
let price = prettyMoney({
    currency: "₽",
    thousandsDelimiter: " "
})(10000);

console.log(price); //=> "10 000 ₽" on any Node, in any browser
```

## Install

`pretty-money` is available on NPM, so you can install it your usual way:

```sh
npm install pretty-money
// or
yarn add pretty-money
```

If you want to use pretty-money in browser, you can install the latest version with jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/pretty-money@1.0/dist/pretty-money.umd.js"></script>
```

## Usage

There are two ways you can use a formatting function: traditional and functional. 

Traditional way is to extract a config object for reuse and to call the function with two parameters — config and number —
every time:

```js
const prettyDollarConfig = {
    currency: "$",
    position: "before",
    spaced: false,
    thousandsDelimiter: ","
}

const priceA = prettyMoney(prettyDollarConfig, 1234); //=> "$1,234"
const priceB = prettyMoney(prettyDollarConfig, 567.89); //=> "$567.89"
```

Functional way is to curry the function, i.e. to create a function with set config and to call it with one parameter — number:

```js
const prettyEuro = prettyMoney({
    currency: "€",
    decimals: "fixed",
    decimalDelimiter: ",",
    thousandsDelimiter: "."
})

const priceA = prettyEuro(1234); //=> "1.234,00 €"
const priceB = prettyEuro(567.89); //=> "567,89 €"
```

You can read more about how to configure pretty-money in the next section, [Config](#config).

## Config

### `currency`
**Type:** `string`  
**Default:** `""`

The string to be used as currency symbol. It can be the respective sign (like "$"), currency code (like "GBP") or a word
(like "peso").

### `decimalDelimiter`
**Type:** `string`  
**Default:** `"."`

A string that separates the integer and the fraction parts of the number.

### `decimals`
**Type:** `string`  
**Values:** `"fixed"`, `"fluid"` or `"minmax"`  
**Default:** `"minmax"`

Sets the amount of decimal places.

- `"fixed"` — the amount of places will always stay at `maxDecimal`. `minDecimal` has no effect.
- `"fluid"` — the amount of places will stay at any number between `minDecimal` and `maxDecimal`, in order not to have trailing zeros.
- `"minmax"` — the amount of places will stay at `maxDecimal` unless it's possible to be at `minDecimal` without having trailing zeros.

### `maxDecimal`
**Type:** `number`  
**Default:** `2`

The maximum number of decimal places allowed in the number.

### `minDecimal`
**Type:** `number`  
**Default:** `0`

The minimum number of decimal places allowed in the number. Has no effect when `decimals` is `"fixed"`.

### `position`
**Type:** `string`  
**Values:** `"before"` or `"after"`  
**Default:** `"after"`

Sets the position of the currency symbol with respect to the number.

### `spaced`
**Type:** `boolean`  
**Default:** `true`

Sets whether there should be a space between the number and the currency symbol.

### `thousandsDelimiter`
**Type:** `string`  
**Default:** `""`

A string that separates the thousands of the number.

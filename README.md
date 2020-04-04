# pretty-money

<img src="https://raw.githubusercontent.com/googlefonts/noto-emoji/master/png/128/emoji_u1f4b8.png" align="right" alt="Money With Wings emoji" width="96" height="96">

A tiny currency formatting library for JavaScript.

- **Small.** Dependency-free. 471 bytes minified and gzipped. Controlled by
  [Size Limit](https://github.com/ai/size-limit).
- **Functional.** The function is automatically curried (think Ramda).
- **Flexible.** It can be tweaked to present any modern currency.

```js
import prettyMoney from "pretty-money";
let price = prettyMoney({ currency: "EUR" }, 10000); //=> "10000 EUR"
```

Works in any ES3-compatible environment, be that Node.js or a browser.
[**Try it yourself**](https://os.karamoff.dev/pretty-money#demo)!

## Install

`pretty-money` is available on NPM, so you can install it your usual way:

```sh
npm install pretty-money
# or
yarn add pretty-money
```

If you only need to use pretty-money on the client side, you can install the
latest version with jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/pretty-money@1.0/dist/pretty-money.umd.js"></script>
```

## Usage

There are two ways to use pretty-money: traditional and functional.

Traditional way is to call the function with two parameters: the config object
and the number you need to format:

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

Functional way is to curry the function, i.e. to create a function with a set
config and to later call it with only one parameter — the number to format:

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

You can read more about the available configuration parameters in the next
section, [Config](#config).

## Config

### `currency`
**Type:** `string`  
**Default:** `""`

The string to be used as currency symbol.  
It can be a respective sign (like "$"), currency code (like "GBP") or a word
(like "peso").

### `decimalDelimiter`
**Type:** `string`  
**Default:** `"."`

A string that separates the integer and the fraction parts of the number.

### `maxDecimal`
**Type:** `number`  
**Default:** `2`

The maximum number of decimal places allowed in the number.

### `minDecimal`
**Type:** `number`  
**Default:** `0`

The minimum number of decimal places allowed in the number. Has no effect when
`decimals` is set to `"fixed"`.

### `decimals`
**Type:** `string`  
**Values:** `"fixed"`, `"fluid"` or `"minmax"`  
**Default:** `"minmax"`

Sets the strategy to calculate the amount of decimal places.

- `"fixed"` — the amount of places will always stay at `maxDecimal`. `minDecimal`
  has no effect.
- `"fluid"` — the amount of places will stay at any number between `minDecimal`
  and `maxDecimal`, in order not to have trailing zeros.
- `"minmax"` — the amount of places will stay at `maxDecimal` unless it's
  possible to be at `minDecimal` without having trailing zeros.

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

## Difference from `toLocaleString`

ECMAScript's `Number` has a method `toLocaleString`, which has a similar idea.
It too can be used to format numbers as financial values and it even has a lot
of built-in locales. However, the output of it is different on different Node.js
versions and browsers:

```js
let price = (10000).toLocaleString("ru", {
    style: "currency",
    currency: "RUB"
});

console.log(price);
//=> "10 000,00 ₽"    in modern browsers
//=> "RUB 10,000.00"  in Node v12.13.0
//=> "RUB 10,000"     in Node v4.8.6
```

This can lead to unexpected output and difficulties in debugging.

While pretty-money doesn't have any locales built-in, it provides a flexible API,
so that the end user can compose any currency formatting function they need.

```js
let price = prettyMoney({
    currency: "₽",
    thousandsDelimiter: " "
}, 10000);

console.log(price);
//=> "10 000 ₽"       in every Node, in every browser
```

## Development

If you want to improve pretty-money, create your own fork of it or just play
around with the developer build, here's all you need to know:

- `npm run dev` to start a dev server, which will automatically build the
  library after you change the source and output it to
  `./dist/pretty-money.dev.js`
- `npm run build` to build the production-ready minified version of the library
  and output it to `./dist/pretty-money.umd.js` and
  `./dist/pretty-money.esm.js`
- `npm run test` to build the project and run all tests, which include:
  - `npm run test:lint` to check the code formatting with ESLint (this won't
    auto fix errors)
  - `npm run test:unit` to run the Jest unit tests
  - `npm run test:size` to check the size

There are no peer dependencies and other extra requirements. Any help is welcome
when it keeps things simple and small.

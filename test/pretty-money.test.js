import { suite } from "uvu";
import * as assert from "uvu/assert";

import prettyMoney from "../src/pretty-money.js";

const argument = suite("argument");

argument("can be an integer number", () => {
	assert.is(prettyMoney({}, 1234), "1234");
});

argument("can be a float number", () => {
	assert.is(prettyMoney({}, 1234.56), "1234.56");
});

argument("can be a stringified integer number", () => {
	assert.is(prettyMoney({}, "1234"), "1234");
});

argument("can be a stringified float number", () => {
	assert.is(prettyMoney({}, "1234.56"), "1234.56");
});

argument("can be a wrong string", () => {
	assert.is(prettyMoney({}, "1234,56"), "NaN");
});

argument.run();

// ---

const call = suite("call");

call("when curried should match the non-curried call", () => {
	assert.is(prettyMoney({})(1234), prettyMoney({}, 1234));
});

call.run();

// ---

const currency = suite("currency");

currency("should be appended, when set, or by default", () => {
	assert.is(prettyMoney({ currency: "RUB" }, 1234), "1234 RUB");
	assert.is(prettyMoney({ currency: "RUB", position: "after" }, 1234), "1234 RUB");
});

currency("should be prepended, when set", () => {
	assert.is(prettyMoney({ currency: "USD", position: "before" }, 1234), "USD 1234");
});

currency.run();

// ---

const decimalsFixed = suite("decimals: fixed");

decimalsFixed("should add decimals to a whole number", () => {
	assert.is(prettyMoney({ decimals: "fixed" }, 1234), "1234.00");
});

decimalsFixed("should normalize decimals", () => {
	assert.is(prettyMoney({ decimals: "fixed" }, 1234.5), "1234.50");
	assert.is(prettyMoney({ decimals: "fixed" }, 1234.56), "1234.56");
	assert.is(prettyMoney({ decimals: "fixed" }, 1234.567), "1234.56");
});

decimalsFixed("should ignore minDecimal", () => {
	assert.is(prettyMoney({ decimals: "fixed", minDecimal: 1 }, 1234), "1234.00");
});

decimalsFixed("should respect maxDecimal", () => {
	assert.is(prettyMoney({ decimals: "fixed", maxDecimal: 1 }, 1234), "1234.0");
	assert.is(prettyMoney({ decimals: "fixed", maxDecimal: 3 }, 1234), "1234.000");
});

decimalsFixed.run();

// ---

const decimalsFluid = suite("decimals: fluid");

decimalsFluid("by default, shouldn't add extra decimals", () => {
	assert.is(prettyMoney({ decimals: "fluid" }, 1234), "1234");
	assert.is(prettyMoney({ decimals: "fluid" }, 1234.5), "1234.5");
});

decimalsFluid("should add extra decimals, if minDecimal specified", () => {
	assert.is(prettyMoney({ decimals: "fluid", minDecimal: 1 }, 1234), "1234.0");
	assert.is(prettyMoney({ decimals: "fluid", minDecimal: 1 }, 1234.5), "1234.5");
});

decimalsFluid("should cut off extra decimals, respecting maxDecimal", () => {
	assert.is(prettyMoney({ decimals: "fluid", maxDecimal: 2 }, 1234.567), "1234.56");
	assert.is(prettyMoney({ decimals: "fluid", maxDecimal: 0 }, 1234.5), "1234");
});

decimalsFluid.run();

// ---

const decimalsMinmax = suite("decimals: minmax");

decimalsMinmax("shouldn't add extra decimals, respecting minDecimal and maxDecimal", () => {
	assert.is(prettyMoney({ }, 1234), "1234");
	assert.is(prettyMoney({ minDecimal: 2 }, 1234.56), "1234.56");
});

decimalsMinmax("should add extra decimals, respecting minDecimal", () => {
	assert.is(prettyMoney({ minDecimal: 2 }, 1234), "1234.00");
});

decimalsMinmax("should add extra decimals, respecting maxDecimal", () => {
	assert.is(prettyMoney({ }, 1234.5), "1234.50");
});

decimalsMinmax("should cut off extra decimals, respecting maxDecimal", () => {
	assert.is(prettyMoney({ }, 1234.567), "1234.56");
	assert.is(prettyMoney({ maxDecimal: 1 }, 1234.56), "1234.5");
});

decimalsMinmax.run();

// ---

const decimalDelimiter = suite("decimalDelimiter");

decimalDelimiter("by default, should be a dot", () => {
	assert.is(prettyMoney({ }, 1234.56), "1234.56");
});

decimalDelimiter("can be changed", () => {
	assert.is(prettyMoney({ decimalDelimiter: "," }, 1234.56), "1234,56");
	assert.is(prettyMoney({ decimalDelimiter: " " }, 1234.56), "1234 56");
	assert.is(prettyMoney({ decimalDelimiter: "" }, 1234.56), "123456");
});

decimalDelimiter.run();

// ---

const thousandsDelimiter = suite("thousandsDelimiter");

thousandsDelimiter("by default, should be empty", () => {
	assert.is(prettyMoney({ }, 12345), "12345");
});

thousandsDelimiter("can be changed", () => {
	assert.is(prettyMoney({ thousandsDelimiter: "," }, 12345), "12,345");
	assert.is(prettyMoney({ thousandsDelimiter: " " }, 12345), "12 345");
	assert.is(prettyMoney({ thousandsDelimiter: "." }, 12345), "12.345");
});

thousandsDelimiter.run();

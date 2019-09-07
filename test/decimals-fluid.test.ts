import prettify from "../src/pretty-money";

test("default config with fluid decimals and number with no decimals", () => {
    expect(prettify({ currency: "RUB", decimals: "fluid" }, 1234))
        .toBe("1234 RUB");
});

test("default config with fluid decimals and number with less decimals", () => {
    expect(prettify({ currency: "RUB", decimals: "fluid" }, 1234.5))
        .toBe("1234.5 RUB");
});

test("default config with fluid decimals and number with same amount of decimals", () => {
    expect(prettify({ currency: "RUB", decimals: "fluid" }, 1234.56))
        .toBe("1234.56 RUB");
});

test("default config with fluid decimals and number with more decimals", () => {
    expect(prettify({ currency: "RUB", decimals: "fluid" }, 1234.567))
        .toBe("1234.56 RUB");
});

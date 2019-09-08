import prettyMoney from "../src/pretty-money";

test("default config with fluid decimals and number with no decimals", () => {
    expect(prettyMoney({ currency: "RUB", decimals: "fluid" }, 1234))
        .toBe("1234 RUB");
});

test("default config with fluid decimals and number with less decimals", () => {
    expect(prettyMoney({ currency: "RUB", decimals: "fluid" }, 1234.5))
        .toBe("1234.5 RUB");
});

test("default config with fluid decimals from 1 to 2 and number with less decimals", () => {
    expect(prettyMoney({ currency: "RUB", decimals: "fluid", minDecimal: 1 }, 1234.5))
        .toBe("1234.5 RUB");
});

test("default config with fluid decimals from 1 to 2 and number with no decimals", () => {
    expect(prettyMoney({ currency: "RUB", decimals: "fluid", minDecimal: 1 }, 1234))
        .toBe("1234.0 RUB");
});

test("default config with fluid decimals and number with same amount of decimals", () => {
    expect(prettyMoney({ currency: "RUB", decimals: "fluid" }, 1234.56))
        .toBe("1234.56 RUB");
});

test("default config with fluid decimals and number with more decimals", () => {
    expect(prettyMoney({ currency: "RUB", decimals: "fluid" }, 1234.567))
        .toBe("1234.56 RUB");
});

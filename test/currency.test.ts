import prettify from "../src/pretty-money";

test("default config with currency", () => {
    expect(prettify({ currency: "RUB" }, 1234))
        .toBe("1234 RUB");
});

test("default config with currency before amount", () => {
    expect(prettify({ currency: "USD", position: "before" }, 1234))
        .toBe("USD 1234");
});

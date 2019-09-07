import prettyMoney from "../src/pretty-money";

test("comma", () => {
    expect(prettyMoney({ decimalDelimiter: "," }, 1234.56))
        .toBe("1234,56");
});

test("space", () => {
    expect(prettyMoney({ decimalDelimiter: " " }, 1234.56))
        .toBe("1234 56");
});

test("none", () => {
    expect(prettyMoney({ decimalDelimiter: "" }, 1234.56))
        .toBe("123456");
});

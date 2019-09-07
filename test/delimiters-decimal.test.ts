import prettify from "../src/pretty-money";

test("comma", () => {
    expect(prettify({ decimalDelimiter: "," }, 1234.56))
        .toBe("1234,56");
});

test("space", () => {
    expect(prettify({ decimalDelimiter: " " }, 1234.56))
        .toBe("1234 56");
});

test("none", () => {
    expect(prettify({ decimalDelimiter: "" }, 1234.56))
        .toBe("123456");
});

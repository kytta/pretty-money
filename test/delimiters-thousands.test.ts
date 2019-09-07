import prettify from "../src/pretty-money";

test("comma", () => {
    expect(prettify({ thousandsDelimiter: "," }, 1234))
        .toBe("1,234");
});

test("dot", () => {
    expect(prettify({ thousandsDelimiter: "." }, 1234))
        .toBe("1.234");
});

test("space", () => {
    expect(prettify({ thousandsDelimiter: " " }, 1234))
        .toBe("1 234");
});

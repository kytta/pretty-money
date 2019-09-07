import prettyMoney from "../src/pretty-money";

test("comma", () => {
    expect(prettyMoney({ thousandsDelimiter: "," }, 1234))
        .toBe("1,234");
});

test("dot", () => {
    expect(prettyMoney({ thousandsDelimiter: "." }, 1234))
        .toBe("1.234");
});

test("space", () => {
    expect(prettyMoney({ thousandsDelimiter: " " }, 1234))
        .toBe("1 234");
});

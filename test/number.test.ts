import prettyMoney from "../src/pretty-money";

test("integer number", () => {
    expect(prettyMoney({}, 1234))
        .toBe("1234");
});

test("float number", () => {
    expect(prettyMoney({}, 1234.56))
        .toBe("1234.56");
});

test("integer string", () => {
    expect(prettyMoney({}, "1234"))
        .toBe("1234");
});

test("float string", () => {
    expect(prettyMoney({}, "1234.56"))
        .toBe("1234.56");
});

test("wrong string", () => {
    expect(prettyMoney({}, "1234,56"))
        .toBe("NaN");
});

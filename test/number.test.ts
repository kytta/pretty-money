import prettify from "../src/pretty-money";

test("integer number", () => {
    expect(prettify({}, 1234))
        .toBe("1234");
});

test("float number", () => {
    expect(prettify({}, 1234.56))
        .toBe("1234.56");
});

test("integer string", () => {
    expect(prettify({}, "1234"))
        .toBe("1234");
});

test("float string", () => {
    expect(prettify({}, "1234.56"))
        .toBe("1234.56");
});

test("wrong string", () => {
    expect(prettify({}, "1234,56"))
        .toBe("NaN");
});

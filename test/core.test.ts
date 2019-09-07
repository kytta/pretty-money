import prettify from "../src/pretty-money";

test("curried should match simple", () => {
    expect(prettify({})(1234))
        .toBe(prettify({}, 1234));
});

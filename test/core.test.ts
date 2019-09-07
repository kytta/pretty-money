import prettyMoney from "../src/pretty-money";

test("curried should match simple", () => {
    expect(prettyMoney({})(1234))
        .toBe(prettyMoney({}, 1234));
});

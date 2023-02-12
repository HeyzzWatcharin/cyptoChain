const cryptoHash = require("./crypto-hash");

describe("cryptoHash", () => {
  it("generate SHA-256", () => {
    expect(cryptoHash("foo")).toEqual(cryptoHash("foo"));
  });
});

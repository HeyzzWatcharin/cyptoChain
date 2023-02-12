const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe("Block", () => {
  const timestamp = "a-date";
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const block = new Block({ timestamp, lastHash, hash, data });

  it("has data test", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("genesis instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mine Data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("return block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be ``hash ", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets the `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(timestamp);
    });

    it("mindBlock Hashing a SHA-256", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, minedBlock.lastHash, data)
      );
    });
  });
});

const { getCallError } = require("./utils");

const MyNFT = artifacts.require("MyNFT");

contract("Contract MyNFT", (accounts) => {
  const adminAddress = accounts[0];
  let nftInstance;

  before(async () => {
    nftInstance = await MyNFT.new({
      from: adminAddress,
    });
  });

  it("should mint token freely only when caller is admin", async () => {
    // When
    await nftInstance.mint({
      from: adminAddress,
    });

    // Then
    var mintedNfts = await nftInstance.allTokens();
    assert.equal(mintedNfts, 1);
  });

  it("should fail to mint token freely when caller is not admin", async () => {
    // Given
    const unknownCaller = accounts[5];

    // When
    const error = await getCallError(
      nftInstance.mint({
        from: unknownCaller,
      })
    );

    // Then
    assert.equal(error, "should be admin");
  });

  it("should mint token only when sufficient amount of ethers is passing to contract", async () => {
    // Given
    const unknownCaller = accounts[5];

    // When
    await nftInstance.publicMint({
      value: web3.utils.toWei("0.9"),
      from: unknownCaller,
    });

    // Then
    var mintedNfts = await nftInstance.allTokens();
    assert.equal(mintedNfts, 2);
  });

  it("should fail to mint token with insufficient amount of ethers sent", async () => {
    // Given
    const unknownCaller = accounts[5];

    // When
    const error = await getCallError(
      nftInstance.publicMint({
        value: web3.utils.toWei("0.00000005"),
        from: unknownCaller,
      })
    );

    // Then
    assert.equal(error, "insuficient amount sent");
  });

  it("should close collection when caller is admin", async () => {
    // When
    await nftInstance.setCollectionClose({
      from: adminAddress,
    });

    // Then
    const collectionIsOpen = await nftInstance.isMintOpen();
    assert.isFalse(collectionIsOpen);
  });

  it("should fail to mint token collection is closed", async () => {
    // Given
    const unknownCaller = accounts[5];

    // When
    const error = await getCallError(
      nftInstance.publicMint({
        value: web3.utils.toWei("0.05"),
        from: unknownCaller,
      })
    );

    // Then
    assert.equal(error, "collection is now closed");
  });
});

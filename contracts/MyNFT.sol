// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    address admin;
    uint256 public allTokens = 0;
    bool public isMintOpen = true;

    constructor() ERC721("MyNFT", "MNFT") {
        admin = msg.sender;
    }

    modifier checkCollectionOpened() {
        require(isMintOpen, "collection is now closed");
        _;
    }

    function mint() public {
        require(msg.sender == admin, "should be admin");
        _mint(msg.sender, allTokens);
        allTokens++;
    }

    function publicMint() public payable checkCollectionOpened {
        require(msg.value >= 0.0003 ether, "insuficient amount sent");
        _mint(msg.sender, allTokens);
        allTokens++;
    }

    function setCollectionClose() public {
        require(msg.sender == admin, "should be admin");
        isMintOpen = !isMintOpen;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";
    }
}

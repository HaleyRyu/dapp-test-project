// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable {
    constructor() ERC721("AmiAnimals", "AA") {}

    // animalTokenId => animalType (1-5)
    mapping(uint256 => uint256) public animalTypes;

    function mintAnimalToken() public {
        uint256 animalTokenId = totalSupply() + 1;

        // animalType 랜덤화 (1-5)
        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId);
    }
}
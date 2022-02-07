// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; // compiler version

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAminalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAminalTokenAddress);
    }

    // animalTokenId => price
    mapping(uint256 => uint256) public animalTokenPrices;

    // FE에서 어떤 토큰이 판매중인 토큰인지 확인하는데 사용하는 배열.
    uint256[] public onSaleAnimalTokenArray;

    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale.");

        // isApprovedForAll: 주인이 판매계약서의 판매 권한을 넘겼는지를 확인하는 함수.
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner didn't approve token.");
    
        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }
}

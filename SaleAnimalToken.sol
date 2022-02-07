// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; // compiler version

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAminalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAminalTokenAddress);
    }

    // animalTokenId => price
    mapping(uint256 = > uint256) public animalTokenPrices;

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

    // payable 키워드를 붙여야 polygon network 에서 matic 이 이동하는 함수를 실행할 수 있다.
    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];
        
        // Caller가 구매하려는 토큰의 주인의 주소값을 불러온다.
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        // 구매하려는 토큰의 price 가 0보다 같거나 작다면 아직 판매등록 되지 않은 토큰이므로 구매할 수 없다.
        require(price > 0, "This token is not on sale.");

        // 위 함수를 실행할때 Caller가 보내는 matic 양. price 보다 같거나 크게 보내야 구매할 수 있다.
        require(price <= msg.value, "Caller sent lower than price.");

        // Caller 가 토큰의 주인과는 다른 사람이어야 구매가 가능하다.
        require(animalTokenOwner != msg.sender, "Caller is animal token's owner.");

        // msg.sender 에 msg.value 만큼의 양이 토큰 주인에게 전송된다.
        payable(animalTokenOwner).transfer(msg.value);

        // 구매한 토큰의 주인을 sender 로 변경한다.
        // 인자: 보내는 사람, 받는 사람, 토큰ID
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOwner, msg.sender, _animalTokenId);

        // 팔린 토큰의 price 초기화
        animalTokenPrices[_animalTokenId] = 0;

        // 판매 등록된 리스트에서 팔린 토큰은 삭제
        for(uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    // Frontend 에서 사용할 함수 (판매중인 리스트 사이즈를 가져오는 함수)
    function getOnSaleAnimalTokenArrayLength() view public returns (uint256) {
        return onSaleAnimalTokenArray.length;
    }
}

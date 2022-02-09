import React, {FC, useState} from "react";
import { mintAnimalTokenContract } from "../contracts";
import AnimalCard from "../components/AnimalCard";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface MainProps {
    account: string;
}

const Main: FC<MainProps> = ({ account }) => {
    const [newAnimalType, setNewAnimalType] = useState<string>("");

    const handleMintBtnClick = async () => {
        try {
            if(!account) return;

            console.log(account);
            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account});

            console.log(response);
            
            if (response.status) {
                // 소유한 카드의 전체 개수를 가져오는 구문.
                const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();

                // 소유한 카드 중 마지막 카드의 tokenId 를 가져오는 구문.
                const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1).call();

                // tokenId 로 해당 카드의 타입을 가져오는 구문.
                const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

                setNewAnimalType(animalType);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">
            <Box>
                {newAnimalType ? <AnimalCard animalType={newAnimalType}/> : <Text fontSize="3xl">Let's Mint Animal Card!</Text>}
            </Box>
            <Button mt="4" size="md" colorScheme="blue" onClick={handleMintBtnClick}>Mint</Button>
            <button onClick={handleMintBtnClick}>ddd</button>
        </Flex>
    );
};

export default Main;
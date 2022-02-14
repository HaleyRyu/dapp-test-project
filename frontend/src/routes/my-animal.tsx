import React, {FC, useEffect, useState} from "react";
import { mintAnimalTokenContract, saleAnimalTokenContract, saleAnimalTokenAddress } from "../web3Config";
import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import MyAnimalCard, { IMyAnimalCard } from "../components/MyAnimalCard";

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
    const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>([]);
    const [saleStatus, setSaleStatus] = useState<boolean>(false);

    const getAnimalTokens = async () => {
      try {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();
        
        const tempAnimalCardArray = [];
  
        for (let i = 0; i < parseInt(balanceLength, 10); i++) {
          const animalTokenId = await mintAnimalTokenContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call();
  
          const animalType = await mintAnimalTokenContract.methods
            .animalTypes(animalTokenId)
            .call();
  
          const animalPrice = await saleAnimalTokenContract.methods
            .animalTokenPrices(animalTokenId)
            .call();

          tempAnimalCardArray.push({ animalTokenId, animalType, animalPrice });
        }

        setAnimalCardArray(tempAnimalCardArray);

      } catch (error) {
        console.error(error);
      }
    };
    
    const getIsApprovedForAll = async () => {
      try {
        const response = await mintAnimalTokenContract.methods.isApprovedForAll(account, saleAnimalTokenAddress).call();
        
        if (response) {
          setSaleStatus(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleApproveBtnClick = async () => {
      try {
        if (!account) return;
        
        const response = await mintAnimalTokenContract.methods.setApprovalForAll(saleAnimalTokenAddress, !saleStatus).send({ from: account });
        if (response.status) setSaleStatus(!saleStatus);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if (!account) return;

      getIsApprovedForAll();
      getAnimalTokens();
    }, [account]);

    return (
      <>
        <Flex alignItems="center">
          <Text display="inline-block">
            Sale Status : {saleStatus ? "True" : "False"}
          </Text>
          <Button
            size="xs"
            ml={2}
            colorScheme={saleStatus ? "red" : "blue"}
            onClick={handleApproveBtnClick}
          >
            {saleStatus ? "Cancel" : "Approve"}
          </Button>
        </Flex>
        <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
          {animalCardArray &&
            animalCardArray.map((v, i) => {
              return (
                <MyAnimalCard
                  key={i}
                  animalTokenId={v.animalTokenId}
                  animalType={v.animalType}
                  animalPrice={v.animalPrice}
                  saleStatus={saleStatus}
                  account={account}
                />
              );
            })}
        </Grid>
      </>
    );
};

export default MyAnimal;

import React, {FC, useEffect, useState} from "react";
import { mintAnimalTokenContract } from "../contracts";
import MyAnimalCard, { IMyAnimalCard } from "../components/MyAnimalCard";
import { Grid } from "@chakra-ui/react";
import AnimalCard from "../components/AnimalCard";

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
    const [animalCardArray, setAnimalCardArray] = useState<string[]>([]);

    const getAnimalTokens = async () => {
        try {
          const balanceLength = await mintAnimalTokenContract.methods
            .balanceOf(account)
            .call();
    
          if (balanceLength === "0") return;
    
          const tempAnimalCardArray = [];
    
          for (let i = 0; i < parseInt(balanceLength, 10); i++) {
            const animalTokenId = await mintAnimalTokenContract.methods
              .tokenOfOwnerByIndex(account, i)
              .call();
    
            const animalType = await mintAnimalTokenContract.methods
              .animalTypes(animalTokenId)
              .call();
    
            tempAnimalCardArray.push(animalType);
          }
          setAnimalCardArray(tempAnimalCardArray);

        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => {
        if (!account) return;
        getAnimalTokens();
    }, [account]);

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={8} mt={4}>
        {animalCardArray &&
          animalCardArray.map((v, i) => {
            return (
              <AnimalCard key={i} animalType={v} />
            );
          })}
      </Grid>
    );
};

export default MyAnimal;

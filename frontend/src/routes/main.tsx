import React, {FC, useState} from "react";
import { Paper, Box, Button, Container, Stack, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { mintAnimalTokenContract } from "../contracts";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
    account: string;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h4,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Main: FC<MainProps> = ({ account }) => {
    const [newAnimalType, setNewAnimalType] = useState<string>("");

    const handleMintBtnClick = async () => {
        try {
            if(!account) return;

            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account});

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

    return <Container maxWidth="xs">
        <Stack spacing={1}>
            <Item>
                <Box>
                    {newAnimalType ? <AnimalCard animalType={newAnimalType}/> : "Let's Mint Animal Card!"}
                </Box>
            </Item>
        </Stack>
        <Stack>
            <Button variant="contained" onClick={handleMintBtnClick}>Mint</Button>
        </Stack>
    </Container>
};

export default Main;
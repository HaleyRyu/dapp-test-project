import React, {FC, useState} from "react";
import { Paper, Box, Button, Container, Stack, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { mintAnimalTokenContract } from "../contracts";

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
    const [newAnimalCard, setNewAnimalCard] = useState<string>("");

    const handleMintBtnClick = async () => {
        try {
            if(!account) return;

            const response = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account});

            console.log(response);
        } catch(error) {
            console.log(error);
        }
    }

    return <Container maxWidth="xs">
        <Stack spacing={1}>
            <Item>
                <Box>
                    {newAnimalCard ? <div>AnimalCard</div> : "Let's Mint Animal Card!"}
                </Box>
            </Item>
        </Stack>
        <Stack>
            <Button variant="contained" onClick={handleMintBtnClick}>Mint</Button>
        </Stack>
    </Container>
};

export default Main;
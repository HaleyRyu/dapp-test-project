import React, { FC } from "react";

export interface IMyAnimalCard {
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
}

interface MyAnimalCardProps {
    animalTokenId: string;
    animalType: string;
    animalPrice: string;
    account: string;
}

const MyAnimalCard: FC<MyAnimalCardProps> = () => {
    return (
        <div></div>
    );
};

export default MyAnimalCard;
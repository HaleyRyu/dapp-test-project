import React, {FC} from "react";

interface AnimalCardProps {
    animalType: string;
}

const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
    return <><img src={`/images/${animalType}.jpg`} width="150" height="150"></img></>;
};

export default AnimalCard;
import React, {FC} from "react";

interface MyAnimalProps {
    account: string;
}

const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
    return (
        <div>My Animal</div>
    );
};

export default MyAnimal;

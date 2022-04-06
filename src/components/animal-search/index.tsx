import React from 'react';
import './animalSearchStyles.css'
import {useAnimalsContext} from "../../context/AnimalContextContainer";
import IndividualAnimal from "./IndividualAnimal";


interface props {
    isDeleteMode: boolean
}

const AnimalSearch: React.FC<props> = ({isDeleteMode}) => {
    const {filteredAnimalData} = useAnimalsContext()
    return (
        <section data-testid="display-students">
            {filteredAnimalData && (filteredAnimalData.map((animal, index) => {
                return (
                    <>
                        {!isDeleteMode && (
                            <IndividualAnimal animal={animal} index={index} isDeleteMode={isDeleteMode}/>)}
                        {/*@ts-ignore*/}
                        {isDeleteMode && animal.id.toString().length > 1 ?
                            <IndividualAnimal animal={animal} index={index} isDeleteMode={isDeleteMode}/> : <></>}
                    </>
                )
            }))}
        </section>

    )
}
export default AnimalSearch
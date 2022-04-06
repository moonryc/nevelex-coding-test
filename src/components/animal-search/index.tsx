import React from 'react';
import './animalSearchStyles.css';
import { useAnimalsContext } from '../../context/AnimalContextContainer';
import IndividualAnimal from './IndividualAnimal';
import { ReactComponent } from '*.svg';


interface props {
  isDeleteMode: boolean;
}

const AnimalSearch: React.FC<props> = ({ isDeleteMode }) => {
  const { nameFilter,allAnimals } = useAnimalsContext();
  return (
    <section data-testid='display-students'>
      {allAnimals &&(allAnimals.filter((animal)=>animal.commonName.toLowerCase().includes(nameFilter.toLowerCase())).map((animal, index) => {
        return (
          <React.Fragment key={index}>
            {!isDeleteMode && (<IndividualAnimal animal={animal} index={index} isDeleteMode={isDeleteMode} />)}
            {isDeleteMode && animal.id && animal.id.toString().length > 1 && (<IndividualAnimal animal={animal} index={index} isDeleteMode={isDeleteMode} />)}
          </React.Fragment>
        );
      }))}
    </section>

  );
};
export default AnimalSearch;
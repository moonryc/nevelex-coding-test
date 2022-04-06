import React from 'react';
import { IAnimal } from '../../types';
import './selectedAnimalStyle.css';
import { getImageFallback } from '../../services';

interface props {
  selectedAnimal: IAnimal | null;
}

const SelectedAnimal: React.FC<props> = ({ selectedAnimal }) => {
  return (
    <div className={'selected-animal'}>
      {selectedAnimal && (<>
        <img alt={selectedAnimal.commonName} src={selectedAnimal.imageURL} className={'imageStyle'} onError={({currentTarget})=>getImageFallback(currentTarget,selectedAnimal?.id)}/>
        <h1 className={'headerStyle'}>
          {selectedAnimal.commonName.toUpperCase()}
        </h1>
        <p className={'paragraph-style'}>Scientific name: {selectedAnimal.scientificName}</p>
        <p className={'paragraphStyle'}>Family: {selectedAnimal.family}</p>
      </>)}
    </div>
  );
};

export default SelectedAnimal;

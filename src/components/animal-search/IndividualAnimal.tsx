import { IAnimal } from '../../types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAnimalById } from '../../hooks';

interface props {
  animal: IAnimal
  index: number,
  isDeleteMode: boolean
}

const IndividualAnimal: React.FC<props> = ({ animal, index, isDeleteMode }) => {
  const navigate = useNavigate();
  const { deleteAnimalById } = useDeleteAnimalById();

  const handleDelete = async () => {
    await deleteAnimalById(animal.id as string);
  };

  const handleClick = () => {
    navigate(`/${animal.id}`);
  };

  return (
    <article key={animal.commonName + index} className={'animalStyle'}>
      <div className={'animal-image-and-text-container'} onClick={handleClick}>
        <img alt={animal.commonName} src={animal.imageURL}
          className={'imageStyle'} />
        <h1 className={'headerStyle'}>
          {animal.commonName.toUpperCase()}
        </h1>
      </div>
      {isDeleteMode && (<button onClick={handleDelete} className={'delete-button'}>Delete</button>)}
    </article>
  );
};

export default IndividualAnimal;
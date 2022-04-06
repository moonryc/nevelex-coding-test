import React, { useEffect, useState } from 'react';
import Wrapper from '../components/wrapper';
import Paper from '../components/paper';
import AnimalSearch from '../components/animal-search';
import { useNavigate } from 'react-router-dom';
import { useGetAllAnimals } from '../hooks';
import { useAnimalsContext } from '../context/AnimalContextContainer';

interface props {
}


const AllAnimals: React.FC<props> = () => {

  const navigate = useNavigate();
  const { nameFilter, setNameFilter } = useAnimalsContext();
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const toNewAnimal = () => {
    navigate('/new');
  };
  const toggleDeleteMode = () => {
    setIsDeleteMode(prevState => !isDeleteMode);
  };

  const { fetchAllPokemon } = useGetAllAnimals();
  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <Wrapper>
      <Paper>
        <div className={'input-container'}>
          <button className={'menu-button'} onClick={toNewAnimal}>NEW ANIMAL</button>
          <button className={'menu-button'} onClick={toggleDeleteMode}>DELETE ANIMAL</button>
        </div>
        <div className={'search-field-container'}>
          <input type='text' value={nameFilter} className={'search-field'} placeholder='Search By Name'
            onChange={(event) => setNameFilter(event.target.value)} />
        </div>
        <AnimalSearch isDeleteMode={isDeleteMode} />
      </Paper>
    </Wrapper>
  );
};

export default AllAnimals;

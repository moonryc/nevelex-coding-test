import { useGetAllAnimals } from './useGetAllAnimals';
import { IAnimal } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


/**
 *  @returns {createAnimal,error}
 */
export const useCreateAnimal = () => {
  const navigation = useNavigate();
  const { fetchAllPokemon } = useGetAllAnimals();
  const [error, setError] = useState<string>('');

  /**
   * creates a new animal
   * @param animal
   */
  const createAnimal = async (animal: IAnimal) => {
    try {
      setError('');
      const response = await fetch('https://animalrestapi.azurewebsites.net/Animal/Create/?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        //@ts-ignore
        body: new URLSearchParams(animal)
      });
      if (!response.ok) {
        return setError('failed to add pokemon');
      }
      const document = await response.json();
      if (document?.id) {
        navigation(`/${document.id}`);
      }
      return await fetchAllPokemon();
    } catch (e) {
      if (typeof e !== 'string') {
        return setError(JSON.stringify(e, null, 2));
      }
      return setError(e);
    }
  };

  return { createAnimal, error };
};
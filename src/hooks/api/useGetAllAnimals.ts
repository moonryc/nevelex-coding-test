import { useAnimalsContext } from '../../context/AnimalContextContainer';
import { useState } from 'react';

/**
 * updates the context that all stores all of the animals
 * @returns {setAllAnimals, error}
 */
export const useGetAllAnimals = () => {

  const { setAllAnimals } = useAnimalsContext();
  const [error, setError] = useState<string>('');

  /**
   * fetches all animals and updates context
   */
  const fetchAllPokemon = async () => {
    try {
      const response = await fetch('https://animalrestapi.azurewebsites.net/Animal/List/?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (!response.ok) {
        return setError('bad response');
      }
      const document = await response.json();
      if (document?.list) {
        return setAllAnimals(document.list);
      }
    } catch (e) {
      if (typeof e === 'string') {
        return setError(e);
      }
      return setError(JSON.stringify(e));
    }
  };
  return { fetchAllPokemon, error };
};
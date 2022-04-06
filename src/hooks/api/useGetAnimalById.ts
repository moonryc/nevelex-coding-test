import { useAnimalsContext } from '../../context/AnimalContextContainer';
import { useState } from 'react';


/**
 * updates the context that holds the selectedAnimal
 * @returns {fetchAnimalById,error}
 */
export const useGetAnimalById = () => {

  const { setSelectedAnimal } = useAnimalsContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  /**
   * updates the context that holds the selected animal
   * @param id
   */
  const fetchAnimalById = async (id: string | number) => {
    try {
      const response = await fetch(`http://animalrestapi.azurewebsites.net/Animal/id/${id}?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!response.ok) {
        return console.log('bad request');
      }
      const document = await response.json();

      if (!document?.animal) {
        setError('error getting animal');
      }
      setLoading(false);
      return setSelectedAnimal(document.animal);
    } catch (e) {
      if (typeof e === 'string') {
        return setError(e);
      }
      setError(JSON.stringify(e, null, 2));
    }
  };
  return { fetchAnimalById, loading, error };
};
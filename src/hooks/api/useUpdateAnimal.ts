import { useCreateAnimal } from './useCreateAnimal';
import { useDeleteAnimalById } from './useDeleteAnimalById';
import { IAnimal } from '../../types';

//TODO: Please understand this is not the way I would normally do this. But
// since there was not an update route provided I created a way to update animals
// to simply give the site more functionality
/**
 * returns a function to update a specific animal using the useCreateAnimal
 * hook and the useDeleteAnimalById hook as a temporary work around
 */
export const useUpdateAnimal = () => {
  const { createAnimal } = useCreateAnimal();
  const { deleteAnimalById } = useDeleteAnimalById();

  /**
   * updates animals
   * @param id
   * @param animal
   */
  const updateAnimal = async (id: number | string, animal: IAnimal) => {
    await deleteAnimalById(id);
    await createAnimal(animal);
  };

  return { updateAnimal };
};
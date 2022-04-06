import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Wrapper from '../components/wrapper';
import Paper from '../components/paper';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAnimalById, useUpdateAnimal } from '../hooks';
import { useAnimalsContext } from '../context/AnimalContextContainer';
import SelectedAnimal from '../components/selectedAnimal/SelectedAnimal';
import AnimalForm from '../components/animalForm';
import { IAnimal } from '../types';

interface props {
}

const initialAnimalData: IAnimal = {
  commonName: '',
  scientificName: '',
  family: '',
  imageURL: ''
};

const Animal: React.FC<props> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { selectedAnimal } = useAnimalsContext();
  const { fetchAnimalById, loading, error } = useGetAnimalById();
  const [animalFormData, setAnimalFormData] = useState<IAnimal>(initialAnimalData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [disableForm, setDisableForm] = useState(false);
  const { updateAnimal } = useUpdateAnimal();

  const toHomepage = () => {
    navigate('/');
  };

  /**
   * updates animalFormData
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimalFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    if (!e.target.value.length) {
      setErrorMessage(`${e.target.name} is required`);
      setIsSubmitDisabled(true);
    } else {
      setErrorMessage('');
      setIsSubmitDisabled(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempObj = JSON.parse(JSON.stringify(animalFormData));
    for (const key in tempObj) {
      if (!tempObj[key]) {
        setIsSubmitDisabled(true);
        setErrorMessage('Whoops! You might be missing a value there!');
        return;
      }
    }
    if (params.animalId) {
      await updateAnimal(params.animalId, animalFormData);
      toHomepage();
    }
  };

  /**
   * updates the selectedAnimal for display and disables the update form if the selectedAnimal is a seed date
   */
  useEffect(() => {
    if (params.animalId) {
      fetchAnimalById(params.animalId);
    }
    if (params.animalId?.length === 1) {
      setDisableForm(true);
    }
  }, []);
  /**
   * updates the animal form data to reflect the change between selectedAnimals
   */
  useEffect(() => {
    if (selectedAnimal) {
      setAnimalFormData(selectedAnimal);
    }
  }, [selectedAnimal]);

  /**
   * Displays Data if there is data to be displayed or displays Animal not found if the animal id is invalid
   * @constructor
   */
  const DisplayData = () => (
    <>
      {!error ? <div className={'selected-animal-container'}>
        <SelectedAnimal selectedAnimal={selectedAnimal} />
        <div>
          <h1>Update Animal</h1>
          <AnimalForm
            disableForm={disableForm}
            errorMessage={errorMessage}
            isSubmitDisabled={isSubmitDisabled}
            animalFormData={animalFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div> : <h1 className={'animal-not-found'}>Animal Not Found</h1>}
    </>
  );


  return (
    <Wrapper>
      <Paper>
        <div className={'input-container'}>
          <button onClick={toHomepage}>BACK</button>
        </div>
        <section>
          {loading && animalFormData ? 'Loading' : <DisplayData />}
        </section>
      </Paper>
    </Wrapper>
  );
};

export default Animal;

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
  const { selectedAnimal } = useAnimalsContext();
  const navigate = useNavigate();
  const params = useParams();
  const { fetchAnimalById, loading } = useGetAnimalById();
  const [animalFormData, setAnimalFormData] = useState<IAnimal>(initialAnimalData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [disableForm, setDisableForm] = useState(false);
  const { updateAnimal } = useUpdateAnimal();

  const toHomepage = () => {
    navigate('/');
  };

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

  useEffect(() => {
    if (params.animalId) {
      fetchAnimalById(params.animalId);
    }
    if (params.animalId?.length === 1) {
      setDisableForm(true);
    }
  }, []);
  useEffect(() => {
    if (selectedAnimal) {
      setAnimalFormData(selectedAnimal);
    }
  }, [selectedAnimal]);


  return (
    <Wrapper>
      <Paper>
        <div className={'input-container'}>
          <button onClick={toHomepage}>BACK</button>
        </div>
        <section>
          {loading && animalFormData ? 'Loading' : <div className={'selected-animal-container'}>
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
          </div>}
        </section>
      </Paper>
    </Wrapper>
  );
};

export default Animal;

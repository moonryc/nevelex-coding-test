import React, { ChangeEvent, FormEvent, useState } from 'react';
import Paper from '../components/paper';
import Wrapper from '../components/wrapper';
import { IAnimal } from '../types';
import { useCreateAnimal } from '../hooks';
import { useNavigate } from 'react-router-dom';
import AnimalForm from '../components/animalForm';

const initialAnimalData: IAnimal = {
  commonName: '',
  scientificName: '',
  family: '',
  imageURL: ''
};

interface props {
}

const NewAnimal: React.FC<props> = () => {
  const navigate = useNavigate();
  const { createAnimal } = useCreateAnimal();
  const [animalFormData, setAnimalFormData] = useState<IAnimal>(initialAnimalData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);


  const toHome = () => {
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
        setErrorMessage('Whoops! you might be missing a value there!');
        return;
      }
    }
    await createAnimal(animalFormData);
  };

  return (
    <Wrapper>
      <Paper>
        <section className={'new-animal-section'}>
          <div className={'input-container'}>
            <button onClick={toHome}>BACK</button>
          </div>
          <AnimalForm
            disableForm={false}
            errorMessage={errorMessage}
            isSubmitDisabled={isSubmitDisabled}
            animalFormData={animalFormData}
            handleChange={handleChange}
            handleSubmit={handleSubmit} />
        </section>
      </Paper>
    </Wrapper>
  );
};

export default NewAnimal;

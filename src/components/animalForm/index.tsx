import React, { ChangeEvent, FormEvent } from 'react';
import { IAnimal } from '../../types';
import './animalFormStyles.css';

interface props {
  errorMessage: string,
  isSubmitDisabled: boolean
  disableForm: boolean
  animalFormData: IAnimal
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => void
}

const AnimalForm: React.FC<props> = ({
  disableForm,
  errorMessage,
  isSubmitDisabled,
  animalFormData,
  handleChange,
  handleSubmit
}) => {
  const { commonName, scientificName, family, imageURL } = animalFormData;
  return (
    <>
      <form className={'new-animal-form'} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor={'commonName'}>Common Name:</label>
          <input
            disabled={disableForm}
            onChange={(e) => handleChange(e)}
            name={'commonName'} value={commonName}
            placeholder={'Common Name'} />
        </div>
        <div>
          <label htmlFor={'scientificName'}>Scientific Name:</label>
          <input
            disabled={disableForm}
            onChange={(e) => handleChange(e)} name={'scientificName'} value={scientificName}
            placeholder={'Scientific Name'} />
        </div>
        <div>
          <label htmlFor={'family'}>Family:</label>
          <input
            disabled={disableForm}
            onChange={(e) => handleChange(e)} name={'family'} value={family}
            placeholder={'Family'} />
        </div>
        <div>
          <label htmlFor={'imageURL'}>URL image:</label>
          <input
            disabled={disableForm}
            onChange={(e) => handleChange(e)} name={'imageURL'} value={imageURL}
            placeholder={'Image URL'} />
        </div>
      </form>
      {disableForm ? <button disabled={true}>Submit</button> : <button disabled={isSubmitDisabled}
        onClick={(e) => handleSubmit(e)}>{errorMessage ? errorMessage : 'Submit'}</button>}
    </>
  );
};

export default AnimalForm;

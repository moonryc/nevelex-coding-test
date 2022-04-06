import React, {ChangeEvent, FormEvent, useState} from 'react';
import Paper from "../components/paper";
import Wrapper from "../components/wrapper";
import {IAnimal} from "../types";
import {useCreateAnimal} from "../hooks";
import {useNavigate} from "react-router-dom";

const initialAnimalData: IAnimal = {
    commonName: '',
    scientificName: '',
    family: '',
    imageURL: '',
}

const NewAnimal = () => {
    const navigate = useNavigate();
    const {createAnimal, error} = useCreateAnimal()
    const [animalFormData, setAnimalFormData] = useState<IAnimal>(initialAnimalData);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const {commonName, scientificName, family, imageURL} = animalFormData

    const toHome = () => {
      navigate('/')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnimalFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
        if(!e.target.value.length){
            setErrorMessage(`${e.target.name} is required`)
            setIsSubmitDisabled(true)
        }else{
            setErrorMessage('')
            setIsSubmitDisabled(false)
        }
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>|FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        for(const key in animalFormData){
            // @ts-ignore
            if(!animalFormData[key]){
                setIsSubmitDisabled(true)
                setErrorMessage('Whoops! you might be missing a value there!')
                return
            }
        }
        await createAnimal(animalFormData)
    }

    return (
        <Wrapper>
            <Paper>
                <section className={'new-animal-section'}>
                    <div className={'input-container'}>
                        <button onClick={toHome}>BACK</button>
                    </div>
                    <form className={'new-animal-form'} onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor={'commonName'}>Common Name:</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                name={'commonName'} value={commonName}
                                placeholder={'Common Name'}/>
                        </div>
                        <div>
                            <label htmlFor={'scientificName'}>Scientific Name:</label>
                            <input
                                onChange={(e) => handleChange(e)} name={'scientificName'} value={scientificName}
                                placeholder={'Scientific Name'}/>
                        </div>
                        <div>
                            <label htmlFor={'family'}>Family:</label>
                            <input
                                onChange={(e) => handleChange(e)} name={'family'} value={family}
                                placeholder={'Family'}/>
                        </div>
                        <div>
                            <label htmlFor={'imageURL'}>URL image:</label>
                            <input
                                onChange={(e) => handleChange(e)} name={'imageURL'} value={imageURL}
                                placeholder={'Image URL'}/>
                        </div>
                    </form>

                    <button disabled={isSubmitDisabled} onClick={(e)=>handleSubmit(e)}>{errorMessage? errorMessage:'Submit'}</button>
                </section>
            </Paper>
        </Wrapper>
    );
};

export default NewAnimal;

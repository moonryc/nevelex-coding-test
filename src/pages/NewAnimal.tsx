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
    const {commonName, scientificName, family, imageURL} = animalFormData

    const toHome = () => {
      navigate('/')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnimalFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createAnimal(animalFormData)
    }

    return (
        <Wrapper>
            <Paper>
                <section>
                    <div className={'input-container'}>
                        <button className={'menu-button'} onClick={toHome}>BACK</button>
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
                            <label htmlFor={'Image URL'}>URL image:</label>
                            <input
                                onChange={(e) => handleChange(e)} name={'imageURL'} value={imageURL}
                                placeholder={'Image URL'}/>
                        </div>
                        <button className={'menu-button'}>Submit</button>
                    </form>
                    {error && (error)}
                </section>
            </Paper>
        </Wrapper>
    );
};

export default NewAnimal;

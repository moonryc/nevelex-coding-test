import React, {ChangeEvent, FormEvent, useReducer, useState} from 'react';
import Paper from "../components/paper";
import Wrapper from "../components/wrapper";
import {IAnimal} from "../types";
import {useCreateAnimal} from "../hooks";

const initialAnimalData: IAnimal = {
    commonName: '',
    scientificName: '',
    family: '',
    imageURL: '',
}

const NewAnimal = () => {

    const {createAnimal,error} = useCreateAnimal()

    const [animalFormData, setAnimalFormData] = useState<IAnimal>(initialAnimalData);
    const {commonName, scientificName, family, imageURL} = animalFormData

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
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div>
                        <label htmlFor={'commonName'}>Common Name:</label>
                        <input onChange={(e) => handleChange(e)} name={'commonName'} value={commonName}
                               placeholder={'commonName'}/>
                    </div>
                    <div>
                        <label htmlFor={'scientificName'}>Scientific Name:</label>
                        <input onChange={(e) => handleChange(e)} name={'scientificName'} value={scientificName}
                               placeholder={'scientificName'}/>
                    </div>
                    <div>
                        <label htmlFor={'family'}>Family:</label>
                        <input onChange={(e) => handleChange(e)} name={'family'} value={family} placeholder={'family'}/>
                    </div>
                    <div>
                        <label htmlFor={'imageURL'}>URL image:</label>
                        <input onChange={(e) => handleChange(e)} name={'imageURL'} value={imageURL}
                               placeholder={'imageURL'}/>
                    </div>
                    <button>Submit</button>
                </form>
                {error && (error)}
                </section>
            </Paper>
        </Wrapper>
    );
};

export default NewAnimal;

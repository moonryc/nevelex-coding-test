import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetAnimalById} from "../../hooks";
import {useAnimalsContext} from "../../context/AnimalContextContainer";

interface props {}

const SelectedAnimal:React.FC<props> = () => {
    const navigate = useNavigate()
    const {selectedAnimal} = useAnimalsContext()

    const toHomepage = () => {
        navigate('/')
    }

    return (
        <section>
            <div className={'input-container'}>
                <button onClick={toHomepage}>BACK</button>
            </div>
            {selectedAnimal && (<>
                <img alt={selectedAnimal.commonName} src={selectedAnimal.imageURL} className={'imageStyle'}/>
                <aside style={{flex: 1}}>
                    <h1 className={'headerStyle'}>
                        {selectedAnimal.commonName.toUpperCase()}
                    </h1>
                    <p className={'paragraph-style'}>Scientific name: {selectedAnimal.scientificName}</p>
                    <p className={'paragraphStyle'} >Family: {selectedAnimal.family}</p>
                </aside>
            </>)}
        </section>
    );
};

export default SelectedAnimal;

import React, {useEffect, useState} from 'react';
import Wrapper from "../components/wrapper";
import Paper from "../components/paper";
import {useNavigate, useParams} from "react-router-dom";
import {useCurrentBreakpoint, useGetAnimalById} from "../hooks";
import {useAnimalsContext} from "../context/AnimalContextContainer";

interface props {}


const Animal:React.FC<props> = () => {
    const params = useParams()
    const navigate = useNavigate()
    const {fetchAnimalById,loading} = useGetAnimalById()
    const {selectedAnimal} = useAnimalsContext()

    const toHomepage = () => {
      navigate('/')
    }

    useEffect(()=>{
        if(params.animalId){
            fetchAnimalById(params.animalId)
        }
    },[])

    return (
        <Wrapper>
            <Paper>
                {!loading &&
                (<section>
                    <div className={'input-container'}>
                        <button className={'menu-button'} onClick={toHomepage}>BACK</button>
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
                </section>)}
            </Paper>
        </Wrapper>
    );
};

export default Animal;

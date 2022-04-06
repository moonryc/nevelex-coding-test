import React, {useEffect} from 'react';
import Wrapper from "../components/wrapper";
import Paper from "../components/paper";
import {useNavigate, useParams} from "react-router-dom";
import {useGetAnimalById} from "../hooks";
import {useAnimalsContext} from "../context/AnimalContextContainer";
import SelectedAnimal from "../components/selectedAnimal/SelectedAnimal";

interface props {}


const Animal:React.FC<props> = () => {


    const params = useParams()
    const {fetchAnimalById,loading} = useGetAnimalById()
    useEffect(()=>{
        if(params.animalId){
            fetchAnimalById(params.animalId)
        }
    },[])


    return (
        <Wrapper>
            <Paper>
                {loading? <></>:<SelectedAnimal/>}
            </Paper>
        </Wrapper>
    );
};

export default Animal;

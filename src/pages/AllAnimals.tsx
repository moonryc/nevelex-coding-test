import React, {useEffect, useState} from 'react';
import Wrapper from "../components/wrapper";
import Paper from "../components/paper";
import AnimalSearch from "../components/animal-search";
import {useNavigate} from "react-router-dom";
import {useGetAllAnimals} from "../hooks";
import NameSearch from "../components/animal-search/NameSearch";
import {useAnimalsContext} from "../context/AnimalContextContainer";

interface props{}


const AllAnimals:React.FC<props> = () => {

    const {nameFilter,setNameFilter} = useAnimalsContext()
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    const navigate = useNavigate()
    const toNewAnimal = () => {
      navigate('/new')
    }
    const toggleDeleteMode = ()=>{
        setIsDeleteMode(prevState => !isDeleteMode)
    }

    const {fetchAllPokemon} = useGetAllAnimals()
    useEffect(() => {
        fetchAllPokemon()
    }, [])

    return (
        <Wrapper>
            <Paper>
                <div>
                <button onClick={toNewAnimal}>New Animal</button>
                <button onClick={toggleDeleteMode}>Delete Animal</button>
                <input type="text" value={nameFilter} className={'search-field'} placeholder='Search By Name' onChange={(event) => setNameFilter(event.target.value)} />
                </div>
                {/*<NameSearch/>*/}
                <AnimalSearch isDeleteMode={isDeleteMode}/>
            </Paper>
        </Wrapper>
    );
};

export default AllAnimals;

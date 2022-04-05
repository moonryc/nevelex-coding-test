import React, {useEffect} from 'react';
import Paper from "./components/paper";
import Animals from "./components/animal-search";
import Wrapper from "./components/wrapper";
import {useGetAllAnimals} from "./hooks";


function App() {

    const {fetchAllPokemon} = useGetAllAnimals()
    useEffect(()=>{
        fetchAllPokemon()
    },[])

    return (
        <Wrapper>
            <Paper>
                <Animals/>
            </Paper>
        </Wrapper>
    );
}

export default App;

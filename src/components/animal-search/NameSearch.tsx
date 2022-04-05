import React, {useContext} from 'react';
import './animalSearchStyles.css'
import {useAnimalsContext} from "../../context/AnimalContextContainer";

const NameSearch = () => {
    const {nameFilter,setNameFilter} = useAnimalsContext()
    return (
        <input type="text" value={nameFilter} className={'search-field'} placeholder='Search By Name' onChange={(event) => setNameFilter(event.target.value)} />
    );
};

export default NameSearch;

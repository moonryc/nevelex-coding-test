import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllAnimals from "./pages/AllAnimals";
import Animal from "./pages/Animal";
import NewAnimal from "./pages/NewAnimal";
import './styles/styles.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<AllAnimals/>}/>
                <Route path={':animalId'} element={<Animal/>}/>
                <Route path={'new'} element={<NewAnimal/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

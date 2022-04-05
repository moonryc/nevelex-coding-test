import React from 'react';
// import { StudentData } from '../../contexts/studentDataContext';
import './animalSearchStyles.css'
import {useAnimalsContext} from "../../context/AnimalContextContainer";
import {useNavigate} from "react-router-dom";

interface props {
    isDeleteMode: boolean
}

const AnimalSearch: React.FC<props> = ({isDeleteMode}) => {

    const {filteredAnimalData} = useAnimalsContext()
    const navigate = useNavigate()

    return (
        <section data-testid="display-students">
            {filteredAnimalData && (filteredAnimalData.map((animal, index) =>
                    <article key={animal.commonName + index} className={'animalStyle'}>
                        <img alt={animal.commonName} onClick={()=>navigate(`/${animal.id}`)} src={animal.imageURL} className={'imageStyle'}/>
                        <aside style={{flex: 1}}>
                            <h1 className={'headerStyle'}>
                                {animal.commonName.toUpperCase()}
                            </h1>
                        </aside>
                        {/*//@ts-ignore*/}
                        {isDeleteMode && animal.id.toString().length > 1 ? <button>Delete</button> : <></>}
                    </article>)
            )}
        </section>

    )
}
export default AnimalSearch
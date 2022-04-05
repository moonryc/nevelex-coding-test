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
    const {fetchAnimalById} = useGetAnimalById()
    const {selectedAnimal} = useAnimalsContext()

    const toHomepage = () => {
      navigate('/')
    }

    useEffect(()=>{
        if(params.animalId){
            fetchAnimalById(params.animalId)
        }
    },[])

    useEffect(() => {
        console.log(selectedAnimal)
    }, [selectedAnimal]);

    const currentBreakpoint = useCurrentBreakpoint();
    const [isMinLarge, setIsMinLarge] = useState(true);

    /**
     *  sets the isMinLarge state to true if the current breakpoint is large or extra large
     */
    useEffect(() => {
        //resize the section based on the breakpoint
        if (['xs', 'sm', 'md'].includes(currentBreakpoint)) {
            setIsMinLarge(false)
        } else {
            setIsMinLarge(true)
        }
    }, [currentBreakpoint])


    return (
        <Wrapper>
            <Paper>
                <section>
                <button onClick={toHomepage}>Back</button>
                {selectedAnimal && (<>
                <img alt={selectedAnimal.commonName} src={selectedAnimal.imageURL} className={'imageStyle'}/>
                <aside style={{flex: 1}}>
                    <h1 className={'headerStyle'}>
                        {selectedAnimal.commonName.toUpperCase()}
                    </h1>
                    <p className={'paragraphStyle'} style={{
                        marginLeft: isMinLarge ? '40px' : '0px',
                        textAlign: isMinLarge ? 'left' : 'center',
                    }}>Scientific name: {selectedAnimal.scientificName}</p>
                    <p className={'paragraphStyle'} style={{
                        marginLeft: isMinLarge ? '40px' : '0px',
                        textAlign: isMinLarge ? 'left' : 'center',
                    }}>Family: {selectedAnimal.family}</p>
                </aside>
                </>)}
                </section>
            </Paper>
        </Wrapper>
    );
};

export default Animal;

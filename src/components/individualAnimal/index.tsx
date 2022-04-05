import React, {useEffect, useMemo, useState} from 'react';
import {IAnimal} from "../../types";
import {useCurrentBreakpoint} from "../../hooks";
import './individualAnimalStyle.css'

interface props {
    animal: IAnimal
}


const IndividualAnimal: React.FC<props> = ({animal}) => {

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
        <>
            <img alt={animal.commonName} src={animal.imageURL} className={'imageStyle'}/>
            <aside style={{flex: 1}}>
                <h1 className={'headerStyle'}>
                    {animal.commonName.toUpperCase()}
                </h1>
                <p className={'paragraphStyle'} style={{
                    marginLeft: isMinLarge ? '40px' : '0px',
                    textAlign: isMinLarge ? 'left' : 'center',
                }}>Scientific name: {animal.scientificName}</p>
                <p className={'paragraphStyle'} style={{
                    marginLeft: isMinLarge ? '40px' : '0px',
                    textAlign: isMinLarge ? 'left' : 'center',
                }}>Family: {animal.family}</p>
            </aside>
        </>
    );
};

export default IndividualAnimal;

import {useContext, useEffect, useMemo, useState} from 'react';
// import { StudentData } from '../../contexts/studentDataContext';
import {useCurrentBreakpoint} from '../../hooks';
import {ReactComponent as MinusIcon} from '../misc/svgs/minus.svg';
import {ReactComponent as PlusIcon} from '../misc/svgs/plus.svg';
import NameSearch from './NameSearch';
import './animalSearchStyles.css'
import {useAnimalsContext} from "../../context/AnimalContextContainer";
import IndividualAnimal from "../individualAnimal";


const AnimalSearch = () => {

    const {filteredAnimalData} = useAnimalsContext()
    const currentBreakpoint = useCurrentBreakpoint();
    const [isMinLarge, setIsMinLarge] = useState(true);


    const styles = useMemo(() => (
        {
            sectionStyle: {
                // is at least large breakpoint
                width: isMinLarge ? '70vw' : '95vw',
                height: '70vh',
                overflow: 'auto',
                scrollBehavior: 'smooth',
            },
            studentStyle: {
                display: 'flex',
                flexDirection: isMinLarge ? 'row' : 'column',
                justifyContent: isMinLarge ? 'space-between' : 'center',
                alignItems: isMinLarge ? 'flex-start' : 'center',
                alignContent: isMinLarge ? 'space-between' : 'flex-start',
                borderBottom: '1px solid #ebecf0',
                padding: '10px',
            },
            paragraphStyle: {
                fontFamily: 'RaleWay',
                fontSize: '1.3rem',
                fontWeight: 200,
                margin: '0px',
                marginLeft: isMinLarge ? '40px' : '0px',
                textAlign: isMinLarge ? 'left' : 'center',
            }
        }), [isMinLarge]);



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
            <NameSearch/>
            {/*@ts-ignore*/}
            <section style={styles.sectionStyle} data-testid="display-students">
                {filteredAnimalData && (filteredAnimalData.map((animal, index) =>
                            //@ts-ignore
                            <article key={animal.commonName + index} style={styles.studentStyle}>
                                <IndividualAnimal animal={animal}/>
                            </article>)
                )}
            </section>
        </>
    )
}
export default AnimalSearch
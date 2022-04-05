import {useAnimalsContext} from "../../context/AnimalContextContainer";

export const useGetAnimalById = () => {

    const {setSelectedAnimal} = useAnimalsContext();

    const fetchAnimalById = async (id: string|number) => {
        try {
            const response = await fetch(`http://animalrestapi.azurewebsites.net/Animal/id/${id}?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa`,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })

            if (!response.ok) {
                return console.log('bad request')
            }
            const document = await response.json();

            if (!document?.animal) {
                return console.log('error getting animal')
            }
            return setSelectedAnimal(document.animal)
        } catch (e) {
            if (typeof e !== "string") {
                return console.log(JSON.stringify(e, null, 2))
            }
        }
    }
    return {fetchAnimalById}
};
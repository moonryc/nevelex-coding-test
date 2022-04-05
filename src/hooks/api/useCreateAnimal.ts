
import {useGetAllAnimals} from "./useGetAllAnimals";
import {IAnimal} from "../../types";

export const useCreateAnimal = () => {

    const {fetchAllPokemon} = useGetAllAnimals()

    const createAnimal = async (pokemon:IAnimal) => {
        try{
            const response = await fetch('https://animalrestapi.azurewebsites.net/?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa',{
                method: 'POST',
                body: new URLSearchParams({
                    param: 'Some value',
                    anotherParam: 'Another value'
                })
            })
            if(!response.ok){
                return console.log('failed to add pokemon')
            }
            await fetchAllPokemon();

        }catch (e) {
            if(typeof e !== 'string'){
                console.log()
            }
        }

    }

}
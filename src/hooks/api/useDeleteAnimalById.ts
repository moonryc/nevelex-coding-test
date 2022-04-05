import {useNavigate} from "react-router-dom";
import {useGetAllAnimals} from "./useGetAllAnimals";
import {useState} from "react";
import {IAnimal} from "../../types";

export const useDeleteAnimalById = () => {

    const {fetchAllPokemon} = useGetAllAnimals()
    const [error, setError] = useState<string>('');

    const deleteAnimalById = async (id:string|number) => {
        try{
            setError('')
            const response = await fetch(`https://animalrestapi.azurewebsites.net/Animal/Delete/${id}/?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
            if(!response.ok){
                return setError('failed to add pokemon')
            }
            // const document = await response.json()
            return await fetchAllPokemon();
        }catch (e) {
            if(typeof e !== 'string'){
                return setError(JSON.stringify(e,null,2))
            }
            return setError(e)
        }
    }

    return {deleteAnimalById,error}

}
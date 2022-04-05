import {useAnimalsContext} from "../../context/AnimalContextContainer";

export const useGetAllAnimals = () => {

    const {setAllAnimals} = useAnimalsContext();

    const fetchAllPokemon = async () => {
        try{
            const response = await fetch(`https://animalrestapi.azurewebsites.net/Animal/List/?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa`,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
            if(!response.ok){
                return console.log('bad response')
            }
            const document = await response.json();
            console.log(document)
            if(document?.list){
                return setAllAnimals(document.list)
            }
        }catch(e){
            console.log(e)
        }
    }
    return {fetchAllPokemon}
}
export const useGetAnimalById = () => {

    // const {setAllPokemon} = usePokemonContext();

    const fetchPokemonById = async (id: string) => {
        try {
            const response = await fetch(`https://animalrestapi.azurewebsites.net/?candidateID=a0690a25-7012-4466-93eb-b40f228f22aa/Animal/Id/${id}`)

            if (!response.ok) {
                return console.log('bad request')
            }
            const document = await response.json();

            if (document?.animal) {
                // return setAllPokemon(document.list)
            }
            // return setAllPokemon([])
        } catch (e) {
            if (typeof e !== "string") {
                return console.log(JSON.stringify(e, null, 2))
            }
        }
    }
    return {fetchPokemonById}
};

const pokeApi = {};

function convertPokeApiDetailsToPokemon(pokeDetails) {
    const pokemonTypes = pokeDetails.types.map(slot => slot.type.name);
    const [pokemonMainType] = pokemonTypes;
    const pokemonPic = pokeDetails.sprites.other['official-artwork'].front_default;
    
    return new Pokemon(pokeDetails.name, pokeDetails.id, pokemonTypes, pokemonMainType, pokemonPic)
}

pokeApi.getPokemon = (pokemonEntry) => {
    return fetch(pokemonEntry.url)
        .then(response => response.json())
        .then(convertPokeApiDetailsToPokemon);
}

pokeApi.getPokemons = (offset, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then(response => response.json())
        .then(body => body.results)
        .then(pokemonEntrys => pokemonEntrys.map(pokeApi.getPokemon))
        .then(detailRequests => Promise.all(detailRequests))
        .catch(err => console.log(err));
}
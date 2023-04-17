
const pokeApi = {};

async function convertPokeApiDetailsToPokemon(pokeDetails) {
    const pokemonTypes = pokeDetails.types.map(slot => slot.type.name);
    const [pokemonMainType] = pokemonTypes;
    const pokemonPic = pokeDetails.sprites.other['official-artwork'].front_default;
    const pokemonAbilities = pokeDetails.abilities.map(a => a.ability.name);
    const pokemonStats = pokeDetails.stats.map(s => new PokemonStat(s.stat.name, s['base_stat']));
    const pokemonMoves = pokeDetails.moves.map(m => m.move.name);

    const speciesInfos = await pokeApi.fetchApi(pokeDetails.species.url);

    const apiEvolutionChain = await pokeApi.fetchApi(speciesInfos['evolution_chain'].url);    
    const evolutionElement = pokeApi.convertApiEvChainToEvElement(apiEvolutionChain.chain);

    return new Pokemon(
        pokeDetails.name, pokeDetails.id, pokemonTypes, pokemonPic, pokeDetails.height,
        pokeDetails.weight, pokemonAbilities, pokemonStats, pokemonMoves,
        speciesInfos.habitat.name, speciesInfos['gender_rate'],
        speciesInfos['egg_groups'].map(eg => eg.name), speciesInfos['is_baby'],
        speciesInfos['is_legendary'], speciesInfos['is_mythical'], evolutionElement
    );
}

pokeApi.convertApiEvChainToEvElement = (chain) => {
    if(chain['evolves_to'].length === 0) return new EvolutionElement(chain.species.name, []);
    return new EvolutionElement(
        chain.species.name,
        chain['evolves_to'].map(el => pokeApi.convertApiEvChainToEvElement(el))
    );
}

pokeApi.fetchApi = async (url) => {
    return fetch(url).then(r => r.json()).catch(console.log);
}

pokeApi.getPokemon = async (pokemonEntry) => {
    return fetch(pokemonEntry.url)
        .then(response => response.json())
        .then(convertPokeApiDetailsToPokemon)
        .catch(console.log);
}

pokeApi.getPokemons = async (offset, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then(response => response.json())
        .then(body => body.results)
        .then(pokemonEntrys => pokemonEntrys.map(pokeApi.getPokemon))
        .then(detailRequests => Promise.all(detailRequests))
        .catch(console.log);
}


function convertPokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.mainType}">
                <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(t => `<li class="type">${t}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.pic}" alt="Picture of ${pokemon.name}">
                </div>
            </li>`;
}

const pokemonList = document.getElementById('pokemonList');

pokeApi.getPokemons(0)
    .then(pokemons => {        
        pokemonList.innerHTML = pokemons
            .map(pk => convertPokemonToLi(pk)).join('');
    })
    .catch(err => console.log(err));
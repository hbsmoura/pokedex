
const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const max = 151;
const limit = 10;
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then(pokemons => {
            const newHtml = pokemons.map(pokemon => 
                `<li class="pokemon ${pokemon.mainType}">
                    <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.pic}" alt="Picture of ${pokemon.name}">
                    </div>
                </li>`
            ).join('');

            pokemonList.innerHTML += newHtml;
        })
        .catch(err => console.log(err));
}

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    let newlimit = offset+limit;
    if(newlimit >= max) {
        loadPokemonItems(offset, max-offset);
        
        loadMoreBtn.parentElement.removeChild(loadMoreBtn);
        return;
    }
    loadPokemonItems(offset, limit);
})

pokemonList.innerHTML = '';
loadPokemonItems(offset, limit);

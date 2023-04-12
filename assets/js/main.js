
const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const modal = document.getElementById('modal');
const backBtn = document.getElementById('backBtn');
const modalName = document.getElementById('modalName');
const modalNumber = document.getElementById('modalNumber');
const modalTypeList = document.getElementById('modalTypeList');
const modalImg = document.getElementById('modalImg');
const modalInfoDesc = document.getElementById('modalInfoDesc');

const allTheTypes = ['normal', 'fire', 'water', 'grass', 'electric', 'ice',
        'ground', 'flying', 'poison', 'fighting', 'psychic', 'dark', 'rock',
        'bug', 'ghost', 'steel', 'dragon', 'fairy'];

const max = 151;
const limit = 10;
let globalPokemonList = [];
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then(pokemons => {
            globalPokemonList = globalPokemonList.concat(pokemons);
            const newHtml = pokemons.map(pokemon => 
                `<a href="javascript:openModal(${pokemon.number})">
                    <li class="pokemon ${pokemon.mainType}">
                        <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.pic}" alt="Picture of ${pokemon.name}">
                        </div>
                    </li>
                </a>`
            ).join('');

            pokemonList.innerHTML += newHtml;
        })
        .catch(err => console.log(err));
}

function openModal(number) {
    pokemon = globalPokemonList.find(pk => pk.number === number);    
    modal.classList.add(pokemon.types[0]);
    modalName.innerHTML = pokemon.name;
    modalNumber.innerHTML = '#' + String(pokemon.number).padStart(3, '0');
    modalTypeList.innerHTML =
        pokemon.types.map(type => `<li class="modal-type">${type}</li>`).join('');
    modalImg.setAttribute('src', pokemon.pic);
    modalImg.setAttribute('alt', 'Picture of ' + pokemon.name);

    modal.classList.remove('hide');
    modal.classList.add('show');
}

function closeModal() {
    modalName.innerHTML = 'pokeball';
    modalNumber.innerHTML = '#000';
    modalTypeList.innerHTML = allTheTypes.map(type => `<li class="modal-type">${type}</li>`).join('');
       
    modalImg.setAttribute('src', 'https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pokebola-Pok%C3%A9mon-PNG.png');
    modalImg.setAttribute('alt', 'Picture of pokeball');

    allTheTypes.concat('show').forEach(type => modal.classList.remove(type));
    modal.classList.add('hide');
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

backBtn.addEventListener('click', closeModal);

document.onkeydown = (evt) => {    
    if (evt.key === 'Escape') closeModal();
};

pokemonList.innerHTML = '';
loadPokemonItems(offset, limit);
closeModal();

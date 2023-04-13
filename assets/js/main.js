
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

const max = 200;
const limit = 10;
let globalPokemonList = [];
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then(pokemons => {
            globalPokemonList = globalPokemonList.concat(pokemons);
            const newHtml = pokemons.map(pokemon => 
                `<a href="javascript:openModal(${pokemon.number})">
                    <li class="pokemon ${pokemon.types[0]}">
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

    modalInfoDesc.innerHTML =     
    `
        <table>
            <tr>
                <th>Height</th><td>${Calculator.getHeightString(pokemon.height)}</td>
            </tr>
            <tr>
                <th>Weight</th><td>${Calculator.getWeightString(pokemon.weight)}</td>
            </tr>
            <tr>
                <th>Abilities</th><td>${pokemon.abilities.map(a => capitalizeFirst(a)).join(', ')}</td>
            </tr>                        
            <tr>
                <th>Habitat</th><td>${capitalizeFirst(pokemon.habitat)}</td>
            </tr>                        
            <tr>
                <th>Gender</th>
                <td><i class="fa-solid fa-mars fa-xs"></i> ${Calculator.getGenderRate(pokemon.genderRate)[0]} - <i class="fa-solid fa-venus fa-xs"></i> ${Calculator.getGenderRate(pokemon.genderRate)[1]}</td>
            </tr>                        
            <tr>
                <th>Egg groups</th><td>${pokemon.eggGroups.map(e => capitalizeFirst(e)).join(', ')}</td>
            </tr>
            <tr>
                <th>Baby, Legendary, Mythical</th>
                <td class="baby-legendary-mythical">
                    ${pokemon.isBaby ? `<i class="hm-icon hm-baby"></i>` : `<i class="hm-icon hm-baby-disable"></i>`}
                    ${pokemon.isLegendary ? `<i class="hm-icon hm-legendary"></i>` : `<i class="hm-icon hm-legendary-disable"></i>`}
                    ${pokemon.isMythical ? `<i class="hm-icon hm-mythic"></i>` : `<i class="hm-icon hm-mythic-disable"></i>`}
                </td>
            </tr>
        </table>
    `;

    modal.classList.remove('hide');
    modal.classList.add('show');
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function closeModal() {
    modalName.innerHTML = 'pokeball';
    modalNumber.innerHTML = '#000';
    modalTypeList.innerHTML = allTheTypes.map(type => `<li class="modal-type">${type}</li>`).join('');
       
    modalImg.setAttribute('src', 'https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pokebola-Pok%C3%A9mon-PNG.png');
    modalImg.setAttribute('alt', 'Picture of pokeball');

    modalInfoDesc.innerHTML =     
    `
        <table>
            <tr>
                <th>Height</th><td>0'0.0" (0.00 m)</td>
            </tr>
            <tr>
                <th>Weight</th><td>0.0 lbs (0.0 kg)</td>
            </tr>
            <tr>
                <th>Abilities</th><td>First, Second, Third...</td>
            </tr>                        
            <tr>
                <th>Habitat</th><td>Everywhere</td>
            </tr>                        
            <tr>
                <th>Gender</th>
                <td><i class="fa-solid fa-mars fa-xs"></i> 50% - <i class="fa-solid fa-venus fa-xs"></i> 50%</td>
            </tr>                        
            <tr>
                <th>Egg groups</th><td>No-eggs</td>
            </tr>
            <tr>
                <th>Baby, Legendary, Mythical</th>
                <td class="baby-legendary-mythical">
                    <i class="hm-icon hm-baby"></i>
                    <i class="hm-icon hm-legendary"></i>
                    <i class="hm-icon hm-mythic"></i>
                </td>
            </tr>
        </table>
    `;

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

const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonType = document.querySelector('.pokemon__type');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const pokemonShiny = document.querySelector('.button__shiny');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

var clicked = 0;
var type = 'default';
let searchPokemon = 1;
let img;

const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){

        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '?';

    const data = await fetchPokemon(pokemon);

    if(data){

        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonType.innerHTML = data['types']['0']['type']['name'];
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`front_${type}`];
        
        input.value = '';

        searchPokemon = data.id;

    }else{

        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found!';
        pokemonId.innerHTML = '?';
    }
}

const funcSub = (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
}

form.addEventListener('submit', funcSub);

const funcShiny = (shiny) =>{

    if(clicked == 0){

        clicked = 1;
        type = 'shiny';
    
    }else if(clicked == 1){

        clicked = 0;
        type = 'default';
    }
    
    renderPokemon(searchPokemon);
}

pokemonShiny.addEventListener('click', funcShiny);

const funcPrev = (prev) =>{

    if(searchPokemon > 1){

        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
}

buttonPrev.addEventListener('click', funcPrev);

const funcNext = (next) =>{

    searchPokemon += 1;
    renderPokemon(searchPokemon);
}

buttonNext.addEventListener('click', funcNext);

renderPokemon(searchPokemon);
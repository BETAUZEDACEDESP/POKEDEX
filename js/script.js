const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let contadora;





//conectar com a Api
const  fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;

    }
};

//renderizar os dados da API
const renderPokemon = async (pokemon) =>{

    pokemonName.textContent = "...carregando";
    pokemonNumber.textContent = "";
    pokemonImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEm7HIYoAfOcAfyyQcO6o4ex6MX-YeWNg10w&s";

    const data = await fetchPokemon(pokemon);

    if (data) {
      
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";

        contadora = data.id;
    
    
        console.log(data);
    } else {
    
        pokemonName.textContent = "Não encontrado";
        pokemonImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToFwo6-DqdsTXZ8ICdG9ugvJMGeXs32yEWpg&s";
        
    }

   
};










form.addEventListener("submit", (event) =>{
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener("click" , () => {
    
    if (contadora > 1) {
        contadora -= 1;
        renderPokemon(contadora)   
    }
} );


buttonNext.addEventListener("click" , () => {
    contadora += 1;
    renderPokemon(contadora);
} );

renderPokemon(1)



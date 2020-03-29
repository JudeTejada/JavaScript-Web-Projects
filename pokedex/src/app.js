// A project that uses Pokeapi to generate 5 random pokemon to display as your Team

// Find a way where whenver we call a function to fetch a pokemon the id that will be pass inside the api will random

const dex = document.getElementById("pokedex");

// generate a random id to get random Pokmoen
const randomNum = () => {
  return Math.floor(Math.random() * 500);
};

// send a Request ot the api
const getRandomPokemon = async () => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${randomNum()}`
  );
  //get the data
  const pokemon = response.data;
  console.log();
  createPokemon(pokemon);
};

//Generate 5 Pokemon
const fetchPokemon = async () => {
  //set the container to empty before generating a pokemon to replace
  dex.innerHTML = "";
  for (let i = 0; i <= 4; i++) {
    // fetch a pokemon
    await getRandomPokemon();
  }
};

//create a Pokemon template
const createPokemon = pokemon => {
  const level = Math.floor(Math.random() * 100);
  const name = pokemon.name;
  const pic = pokemon.sprites.front_default;
  const poke_type = pokemon.types.map(type => type.type.name);
  const type = poke_type.find(type => poke_type.indexOf(type) > -1);

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("card");

  const card = `
      <figure class="card__photo">
        <div class="bg"></div>
        <img src="${pic}" class="card__img" />
      </figure>
      
      <div class="card__body">
        <h2 class="card__name">${name}</h2>
        <p class="card__type">Type: ${type}</p>
      </div>
      <span class="card__level">Lvl.${level}</span>
  `;
  pokemonEl.innerHTML = card;

  pokemonEl.addEventListener("click", setAnimation);
  dex.appendChild(pokemonEl);
};

const setAnimation = e => {
  const parent = e.target.parentElement;

  if (parent.className === "card") {
    parent.style.animation = "bounce 1s ease infinite";
  }
};
document.getElementById("generate").addEventListener("click", fetchPokemon);

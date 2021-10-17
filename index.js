const url = "https://pokeapi.co/api/v2";
const userText = document.getElementById("search");
document.getElementById("button").addEventListener("click", (e) => {
  getData(userText.value.toLowerCase());
});
userText.addEventListener("keydown", (e) => {
  //When the user press enter in the input box the wanted pokemon shows up
  if (e.key === "Enter") getData(userText.value.toLowerCase());
});

const getData = async (nameOrId) => {
  if (!nameOrId) {
    alert("error");
    return;
  }
  try {
    removePreviousTypesFromDom(".newType");
    removePreviousTypesFromDom(".new-poke-by-type");
    const resPokemon = await axios.get(`${url}/pokemon/${nameOrId}`);
    document.getElementById("img").src = resPokemon.data.sprites.front_default;
    document.getElementById("name-value").textContent = resPokemon.data.name;
    document.getElementById("height-value").textContent =
      resPokemon.data.height;
    document.getElementById("weight-value").textContent =
      resPokemon.data.weight;
    for (let i = 0; i < resPokemon.data.types.length; i++) {
      const newSpan = document.createElement("span");
      newSpan.classList.add("newType");
      newSpan.textContent = `| ${resPokemon.data.types[i].type.name} | `;
      document.getElementById("types-value").append(newSpan);
    }
    img.src = resPokemon.data.sprites.front_default;
    img.onmouseenter = function () {
      img.src = resPokemon.data.sprites.back_default;
    };
    img.onmouseout = function () {
      img.src = resPokemon.data.sprites.front_default;
    };

    getType();
  } catch (error) {
    alert("error");
    console.error(error);
  }
};
//get the type from api
function getType() {
  document
    .getElementById("types-value")
    .addEventListener("click", async (e) => {
      const typeText = e.target.textContent
        .replaceAll("|", "")
        .replaceAll(" ", "");
      const resType = await axios.get(`${url}/type/${typeText}`);
      showAllRelatedPokemonsOnDom(resType.data.pokemon);
      document
        .getElementById("related-pokemons")
        .addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          getData(e.target.textContent);
          userText.value = e.target.textContent;
        });
    });
}

function showAllRelatedPokemonsOnDom(pokemons) {
  removePreviousTypesFromDom(".new-poke-by-type");
  pokemons.forEach((pokemon) => {
    const newList = document.createElement("li");
    newList.className =
      "new-poke-by-type list-group-item list-group-item-action list-group-item-secondary";
    newList.textContent = pokemon.pokemon.name;
    document.getElementById("related-pokemons").append(newList);
  });
}

function removePreviousTypesFromDom(cls) {
  for (const newType of document.querySelectorAll(cls)) {
    newType.remove();
  }
}

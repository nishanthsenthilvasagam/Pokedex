const PokeCount =108
let pokedex = {}

let DOM = ``
window.onload = async function(){
    let pokemonListElement = document.getElementById("pokemon-list")
    for(let i=1; i<= PokeCount; i++){
        await importPokemon(i);

        DOM += `
        <div id="${i}" class="pokemon-name">${i}. ${pokedex[i]["name"].toUpperCase()}</div>`

        
    }

    pokemonListElement.innerHTML = DOM
    let pokemonElements = document.getElementsByClassName("pokemon-name")
    for(let j=0;j<pokemonElements.length;j++){
        pokemonElements[j].addEventListener("click",updatePokemon)
    }    
    
    //console.log(pokedex[this.id]["img"])
    
    document.getElementById("pokemon-desc").innerText = pokedex[1]["desc"]
}



async function importPokemon(num){
    let url = `https://pokeapi.co/api/v2/pokemon/${num}`
    let selectedPokemonUrl = await fetch(url)
    let selectedPokemon = await selectedPokemonUrl.json()

    //console.log(selectedPokemon);

    let selectedPokemonName = selectedPokemon["name"]
    let selectedPokemonType = selectedPokemon["types"]
    let selectedPokemonImg = selectedPokemon["sprites"]["front_default"]
    selectedPokemonUrl = await fetch(selectedPokemon["species"]["url"])
    let selectedPokemonDesc = await selectedPokemonUrl.json()
    selectedPokemonDesc = selectedPokemonDesc["flavor_text_entries"][9]["flavor_text"]
    pokedex[num] = {"name" : selectedPokemonName, "img" : selectedPokemonImg, "type" : selectedPokemonType, "desc" : selectedPokemonDesc}

    


}

function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"]

    let typesEle = document.getElementById("pokemon-types")

    while(!typesEle.firstChild){
        typesEle.firstChild.remove()
    }

    let types = pokedex[this.id]["type"]
    //console.log(pokedex[this.id]["type"])
    let typesDOM =``
    for(let i=0; i<types.length;i++){
        typesDOM += `
        <span class="type-box ${types[i]["type"]["name"]}">${types[i]["type"]["name"].toUpperCase()}</span>`
    }
    //console.log(typesDOM)
    typesEle.innerHTML = typesDOM

    document.getElementById("pokemon-desc").innerText = pokedex[this.id]["desc"]
    document.getElementById("what-pokemon").innerText = `${pokedex[this.id]["name"]}`
}
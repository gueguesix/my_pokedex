window.onload = function(){
    var form = document.forms['form'];


    var allPokemons = {};

    var req = new XMLHttpRequest();
    req.open("GET", "pokemons.json", true);

    req.onreadystatechange = function (oEvent) {
        if (req.readyState === 4) {
            if (req.status === 200) {
                allPokemons = JSON.parse(req.responseText);
            } else 
                form.innerHTML = 'Error while getting pokemons data : '+req.statusText;
        }
    };
    req.send();

    var formError = document.querySelector('#formError');
    var pokeImg = document.querySelector('#pokemonImg');
    var pokemonName = document.querySelector('#pokemonName');
    var pokemonType = document.querySelector('#pokemonType');

    var pokeImgUrl = 'http://img.pokemondb.net/artwork/';
    form.onsubmit = function(){
        formError.innerHTML = '';
        var nameOrNumber = this.elements['nameOrNumber'].value.toLocaleLowerCase();
        var currentPokemon;

        if(!isNaN(nameOrNumber)){
            currentPokemon = allPokemons[nameOrNumber];
        }else{
            for(var p in allPokemons){
                if(allPokemons[p].name.toLowerCase() == nameOrNumber){
                    currentPokemon = allPokemons[p];
                }
            }
        }

        if(typeof currentPokemon !== 'undefined' && currentPokemon){
            pokemonName.innerText = currentPokemon.name;
            pokemonType.innerText = currentPokemon.type;
            var fullImgUrl = pokeImgUrl+currentPokemon.name.toLowerCase()+'.jpg';
            pokeImg.setAttribute('src', fullImgUrl);
        }
        else{
            
            if(!isNaN(nameOrNumber)){
                formError.innerHTML = 'Pokemon number <u>'+nameOrNumber+"</u> doesn't exist (at least in Gen 1)";
            }else{
                formError.innerHTML = '<u>'+nameOrNumber+'</u> is not a pokemon (at least in Gen 1)';
            }

        }
        return false;
    };
    

};
let form = document.querySelector('form')

form.addEventListener('submit', function(e){
    
    e.preventDefault() //bloqueia o refresh da página

    let urlForm =  "https://pokeapi.co/api/v2/pokemon/"; //url da pesquisa
    
    urlForm = urlForm + this.name.value //concatena a url com o input name

    urlForm = urlForm.toLocaleLowerCase() //transforma o valor do input em minúsculo

    let resposta = document.getElementById('content') //id content

    let imagem = document.getElementById('imgPokemon') //id imgPokemon

    let html = '' //resposta em html


    fetch(urlForm)
        .then(resposta => resposta.json())
        .then(function(data){
            console.log(data)
            html = 'Nome: ' + maiuscula(data.name) + " "
            html = html + 'Type: ' + maiuscula(data.types[0].type.name)
            resposta.innerHTML = html

            imagem.innerHTML = "<img src ='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
        })
        .catch(function(err){
            if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
                html = 'Pokémon não encontrado!'
            } else{
                html = err
            }
            resposta.innerHTML = html
        })

});

function maiuscula(val){
    return val[0].toUpperCase() + val.substr(1) //primeiro valor em maiúsculo e o restante em minúsculo
}
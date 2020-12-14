const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const URL_JOGADOR = 'http://localhost:3000/jogador'

let jogador = ''

function getJogador(){
    try {    
        return fetch(URL_JOGADOR, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        }).then(response => {
            return response.json();
            })  
        .then(json => {
                return json;  
            })    
        .catch(err => console.log('Request Failed', err)); 
    } catch (error) {
        console.log(error); 
    }
}

function getJogadorId(id){
    try {    
        return fetch(`http://localhost:3000/jogador?id=${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        }).then(response => {
            return response.json();
            })  
        .then(json => {
                return json;  
            })    
        .catch(err => console.log('Request Failed', err)); 
    } catch (error) {
        console.log(error); 
    }
}

function getScore(id){
    try {    
        return fetch(`http://localhost:3000/score?id_jogador=${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        }).then(response => {
            return response.json();
            })  
        .then(json => {
                return json;  
            })    
        .catch(err => console.log('Request Failed', err)); 
    } catch (error) {
        console.log(error); 
    }
}

function getScoreGeral(){
    try {    
        return fetch(`http://localhost:3000/score`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors'
        }).then(response => {
            return response.json();
            })  
        .then(json => {
                return json;  
            })    
        .catch(err => console.log('Request Failed', err)); 
    } catch (error) {
        console.log(error); 
    }
}


function getMap(jogadores){
    return jogadores.map(async jogador => {
        let scoreHi = await getScore(jogador.id)
        console.log('scoreHi: ', scoreHi)
        highScoresList.innerHTML = highScoresList.innerHTML + `<li class="high-score">${jogador.nome} - ${scoreHi[0].pontuacao}</li>`
        return await scoreHi[0]
    })
    
}

startGame = async () => {

    // jogadores = await getJogador()
    // console.log('jogadores: ', jogadores)

    // jogadorScore = await getMap(jogadores)

    // console.log('jogadorScore: ', jogadorScore)

    // console.log('highScoresList.innerHTML: ', highScoresList.innerHTML)

    const pontuacoes = await getScoreGeral()

    for (let index = 0; index < pontuacoes.length; index++) {
        
        if(index >=10){
            return
        }

        let jogadorId = await getJogadorId(pontuacoes[index].id_jogador)
        let login = jogadorId[0].login
        
        highScoresList.innerHTML = highScoresList.innerHTML + `<li class="high-score">${index+1}° ${login} - ${pontuacoes[index].pontuacao} pontos</li>`       
        
    }


}

startGame()


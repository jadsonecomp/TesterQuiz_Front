const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

const URL_JOGADOR = 'https://testerquizback.herokuapp.com/jogador'



function getScore(id){
    try {    
        return fetch(`https://testerquizback.herokuapp.com/score?id_jogador=${id}`, {
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

startGame = async () => {
    jogadorScore = await getScore(sessionStorage.getItem('id'))

    for (let index = 0; index < jogadorScore.length; index++) {
        if(index >=5){
            return
        }
        highScoresList.innerHTML = highScoresList.innerHTML + `<li class="high-score">${index+1}° - ${jogadorScore[index].pontuacao} pontos</li>`       
    }
    // jogadorScore.forEach(jogador => {
    //     highScoresList.innerHTML = highScoresList.innerHTML + `<li class="high-score">${sessionStorage.getItem('login')} - ${jogador.pontuacao}</li>`   
    // });


}

startGame()


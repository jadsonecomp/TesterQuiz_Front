// import {usuario} from './loginCadastro.js';
// console.log('usuario: ', usuario);

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const URL_PERGUNTA = 'https://testerquizback.herokuapp.com/pergunta';
const URL_CADASTRO_SCORE = 'https://testerquizback.herokuapp.com/score';


let questions = ''

function getQuestions(){
    try {    
        return fetch(URL_PERGUNTA, {
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

let SCOREJSON = ''
function setScore(){
    try {    
        return fetch(URL_CADASTRO_SCORE, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(SCOREJSON)
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


const SCORE_POINTS = 100
let MAX_QUESTIONS = 4

startGame = async () => {
    document.getElementById("game").style.display = 'none';
    questions = await getQuestions()
    document.getElementById("game").style.display = 'block';
    
    MAX_QUESTIONS = questions.length

    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = async () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        SCOREJSON = { 
            "pontuacao": score, 
            "perguntas": `Acertos: ${questionCounter}`, 
            "id_jogador": sessionStorage.getItem('id')
        }
        const scoreReturn = await setScore()

        return window.location.assign('/end.html')
    }

    questionCounter++
    //progressText.innerText = `${sessionStorage.getItem('login')}: Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressText.innerText = `${sessionStorage.getItem('login')}: Questão ${questionCounter}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]

    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)

            let aplauso = document.getElementById('acerto')
            
            aplauso.play() 
            setTimeout(() => {
                aplauso.pause()  
                   
            }, 2000);
           
            
        }else{
            let erro = document.getElementById('erro')
            erro.play() 
            setTimeout(() => {
                erro.pause()           
            }, 1500);
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(async () => {
            selectedChoice.parentElement.classList.remove(classToApply)

            /* Inclui isto para encerrar ao errar uma questão */
            if(classToApply === 'incorrect') {
                localStorage.setItem('mostRecentScore', score)
                
                SCOREJSON = { 
                    "pontuacao": score, 
                    "perguntas": `Acertos: ${questionCounter - 1}`, 
                    "id_jogador": sessionStorage.getItem('id')
                }
                const scoreReturn2 = await setScore()

                return window.location.assign('/end.html')
            }

            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
// const database = require('./src/db/db');
// const jogadorSchema = require('./src/db/schemas/jogadorSchema');

window.addEventListener('load', start);

const URL_CADASTRO = 'http://localhost:3000/jogador';
const URL_LOGIN = 'http://localhost:3000/login';

let usuario = ''


function start() {
    preventFormSubmit();
}

function preventFormSubmit() {

    
    function handleSubmitLogin(event) {
        

        var resposta = false;

        var login = document.querySelector('#inputLoginLogin').value;
        var senha = document.querySelector('#inputSenhaLogin').value;

        const LOGIN = {
            login: login, 
            senha: senha 
        };

        try { 
            // const teste = new FormData(formLogin);
            
            fetch(URL_LOGIN, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                  }),
                mode: 'cors',
                body: JSON.stringify(LOGIN)
              }).then(response => {
                  return response.json();
                })  // convert to json
              .then(json => {
                  if (json.length > 0) {
                    resposta = true; 
                    usuario = json;
                  }
                  if(!resposta){
                    setTimeout(function(){ alert('Jogador não encontrado'); }, 0);
                  }else{

                    sessionStorage.clear();
                    sessionStorage.setItem('id', json[0].id);
                    sessionStorage.setItem('nome', json[0].nome);
                    sessionStorage.setItem('login', json[0].login);
                    sessionStorage.setItem('nivel', json[0].nivel);

                    loginAud.pause() 

                    return window.location.assign('/home.html')
                  }
                  console.log('json retorno: ', json)
                })    //print data to console
              .catch(err => console.log('Request Failed', err)); // Catch errors
        } catch (error) {
            console.log(error); 
            alert('Confira seus dados e tente novamente');
        }


        event.preventDefault();

    }

    function handleSubmitCadastro(event) {

        var resposta = true;

        var nome = document.querySelector('#inputNomeCadastro').value;
        var email = document.querySelector('#inputEmailCadastro').value;
        var login = document.querySelector('#inputLoginCadastro').value;
        var senha = document.querySelector('#inputSenhaCadastro').value;
        var nivel = 'INICIANTE';

        const JOGADOR = {
            nome: nome, 
            email: email, 
            login: login, 
            senha: senha, 
            nivel: nivel    
        };

        try {
            // const teste = new FormData(formLogin);
            
            fetch(URL_CADASTRO, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                  }),
                mode: 'cors',
                body: JSON.stringify(JOGADOR)
              }).then(response => {
                  resposta = response.ok;
                  return response.json();
                })  // convert to json
              .then(json => {
                  console.log('json retorno: ', json)
                  if(!resposta){
                    setTimeout(function(){ alert('Dados já cadastrados no sistema, por favor, insira novos dados para continuar!'); }, 0);
                    // var alerta = document.getElementById('alrt');
                    // alerta.innerHTML='<b>Please wait, Your download will start soon!!!</b>'; 
                    // alerta.classList.add('login-reg-panel');
                    // setTimeout(function() {document.getElementById('alrt').innerHTML='';},5000);
                    // alerta.classList.remove('login-reg-panel');
                  }else{
                    usuario = json;
                    //setTimeout(function(){ alert('Cadastro realizado com sucesso!!!'); }, 0); 

                    sessionStorage.clear();
                    sessionStorage.setItem('id', json.id);
                    sessionStorage.setItem('nome', json.nome);
                    sessionStorage.setItem('login', json.login);
                    sessionStorage.setItem('nivel', json.nivel);
            
                    loginAud.pause() 
                    return window.location.assign('/home.html')   
                  }
                })    //print data to console
              .catch(err => console.log('Request Failed', err)); // Catch errors

        } catch (error) {
            console.log(error); 
            alert('Confira seus dados e tente novamente');
        }


        event.preventDefault();

    }

    var loginAud = document.getElementById('loginAud')
            
    loginAud.play() 

    var formLogin = document.querySelector('#formLogin');
    var formCadastro = document.querySelector('#formCadastro');

    formLogin.addEventListener('submit', handleSubmitLogin);
    formCadastro.addEventListener('submit', handleSubmitCadastro);
}


export { usuario }; 

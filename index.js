window.addEventListener('load', start);

function start() {
    preventFormSubmit();
}

function preventFormSubmit() {

    let espacoAud = document.getElementById('espaco')
            
    espacoAud.play() 

    setTimeout(function(){ 
        espacoAud.pause()
        return window.location.assign('/login.html') 
    }, 3000);

}
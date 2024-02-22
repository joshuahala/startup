let usernameInput;
let passwordInput;
let dummyUsername = "me";
let dummyPassword = "pass";

let errorUnoriginal = document.getElementById('errorUnoriginal');
let errorIncorrect = document.getElementById('errorIncorrect');

function create() {
    usernameInput = document.getElementById('login-username').value;
    passwordInput = document.getElementById('login-password').value;
    
    if (usernameInput == dummyUsername | passwordInput == dummyPassword) {
        document.getElementById('errorUnoriginal').style.display = "block";
    } else if (usernameInput == "" | passwordInput == "") {  
        
    } else {
        localStorage.setItem('username', usernameInput);
        localStorage.setItem('password', passwordInput);

        window.location.href = "heroes.html";
        //let them in
    }
}
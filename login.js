let usernameInput;
let passwordInput;
let dummyUsername = "me";
let dummyPassword = "pass";


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

function login() {
    usernameInput = document.getElementById('login-username').value;
    passwordInput = document.getElementById('login-password').value;
    if (usernameInput == dummyUsername && passwordInput == dummyPassword) {
        window.location.href = "heroes.html";
    } else {
        document.getElementById('errorIncorrect').style.display = "block";
    }
}
    
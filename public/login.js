let usernameInput;
let passwordInput;
let dummyUsername = "me";
let dummyPassword = "pass";

let getUsername;
let getPassword;

window.onload = function() {
    getLoginInfo();
    document.getElementById('login-username').textContent = "";
    document.getElementById('login-password').textContent = "";

    

}

async function create() {
    usernameInput = document.getElementById('login-username').value;
    passwordInput = document.getElementById('login-password').value;
    
    const response = await fetch("/api/createLogin", {
        method: 'post',
        body: JSON.stringify({username: usernameInput, password: passwordInput}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    });
    if (response.ok) {
        localStorage.setItem('username', usernameInput);
        window.location.href = "heroes.html"
    } else {
        document.getElementById('error-message').style.display = 'block';
    }






    // if (usernameInput == dummyUsername | passwordInput == dummyPassword) {
    //     document.getElementById('errorUnoriginal').style.display = "block";
    // } else if (usernameInput == "" | passwordInput == "") {  
        
    // } else {
    //     // localStorage.setItem('username', usernameInput);
    //     // localStorage.setItem('password', passwordInput);

    //     saveLoginInfo(usernameInput, passwordInput)

    //     window.location.href = "heroes.html";
    //     //let them in
    // }
}

async function login() {
    
    // check if user input matches login info stored on server
    usernameInput = document.getElementById('login-username').value;
    passwordInput = document.getElementById('login-password').value;
    
    const response = await fetch('/api/authLogin', {
        method: 'post',
        body: JSON.stringify({username: usernameInput, password: passwordInput}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    if (response.ok) {
        window.location.href = "heroes.html";
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}
    
//save login info to server
async function saveLoginInfo(username, password) {
    let data = {
        username: username,
        password: password
    }
    
    const response = await fetch('/api/login_info', {
        method: 'Post',
        body: JSON.stringify(data),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    console.log(response)
    // Handle response as needed
}

// get user login info
async function getLoginInfo() {
    fetch('/api/get_login_info')
        .then((response) => response.json())
        .then((data) => {
            loginInfo = data;
            getUsername = loginInfo.username;
            getPassword = loginInfo.password;
            return 1;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
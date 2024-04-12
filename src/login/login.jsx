import React from 'react';
import { useNavigate } from 'react-router-dom';



export function Login() {

  let usernameInput;
  let passwordInput;
  let dummyUsername = "me";
  let dummyPassword = "pass";

  let getUsername;
  let getPassword;

  const navigate = useNavigate();

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
        localStorage.setItem('username', usernameInput)
        navigate('/heroes');
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
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

  //getLoginInfo();
    

  return (
        <div className='login-card'>
          <h1>Bit Hero</h1>
          <p>Username</p>
          <input type="text" id="login-username"></input>
          <p>Password</p>
          <input type="text" id="login-password"></input>
          <p className="error" id="error-message">Please try a different username or password</p>
          <div id="buttons">
            <button id="create" onClick={() => create()}>Create</button>
            <button id="login" onClick={() => login()}>Login</button>
          </div>
        </div>
  );
}
import React from 'react';

export function Login() {
  return (
        <div className='login-card'>
          <h1>Bit Hero</h1>
          <p>Username</p>
          <input type="text" id="login-username"></input>
          <p>Password</p>
          <input type="text" id="login-password"></input>
          <p class="error" id="error-message">Please try a different username or password</p>
          <div id="buttons">
            <button id="create" onclick="create()">Create</button>
            <button id="login" onclick="login()">Login</button>
          </div>
        </div>
  );
}
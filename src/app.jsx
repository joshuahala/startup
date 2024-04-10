import React from 'react';
import './app.css';

export default function App() {
    return(
            <div className='body'>
                <div className='login-card'>
                <h1>Bit Hero</h1>
                <p>Username</p>
                <input type="text" id="login-username"></input>
                <p>Password</p>
                <input type="text" id="login-password"></input>
                <div id="buttons">
                    <button id="create" onclick="create()">Create</button>
                    <button id="login" onclick="login()">Login</button>
                </div>
            </div>
        </div>
    );
  }
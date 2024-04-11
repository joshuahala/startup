import React from 'react';
import './app.css';

export default function App() {
    return(
         <div className='body'>
             <nav>
                 <div id="nav-left">
                     <h1>bit hero</h1>
                     <a href="heroes.html">My Heroes</a>
                     <a href="play.html">Play</a>
                     <a href="scores.html">Scores</a>
                 </div>
                 <div id="nav-right">
                     <p id="username"></p>
                 </div>
                 <button onclick="toggleMenu()" class="dropdown-btn">Menu</button>
                 <div class="dropdown-content">
                     <a href="heroes.html">My Heroes</a>
                     <a href="play.html">Play</a>
                     <a href="scores.html">Scores</a>
                 </div>
             </nav>
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
             <footer>
                <a href="https://github.com/joshuahala/startup">My Startup on Github</a>
            </footer>
         </div>
    );
  }
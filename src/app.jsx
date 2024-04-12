import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { Heroes } from './heroes/heroes';

export default function App() {
    return(
        <BrowserRouter>
         <div className='body'>
             <nav>
                 <div id="nav-left">
                     <h1>bit hero</h1>
                     <NavLink to="heroes">My Heroes</NavLink>
                     <NavLink to="play">Play</NavLink>
                     <NavLink to="scores">Scores</NavLink>
                 </div>
                 <div id="nav-right">
                     <p id="username"></p>
                 </div>
                 <button onClick={() => toggleMenu()} className="dropdown-btn">Menu</button>
                 <div className="dropdown-content">
                     <NavLink to="heroes">My Heroes</NavLink>
                     <NavLink to="play">Play</NavLink>
                     <NavLink to="scores">Scores</NavLink>
                 </div>
             </nav>
        <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/play' element={<Play />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/heroes' element={<Heroes />} />
        <Route path='*' element={<Login />} />
        </Routes>
             
             <footer>
                <a href="https://github.com/joshuahala/startup">My Startup on Github</a>
            </footer>

         </div>
        </BrowserRouter>

    );
  }
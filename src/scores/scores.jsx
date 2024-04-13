import React from 'react';
import './scores.css'
import { useNavigate } from 'react-router-dom';

export function Scores() {

  const navigate = useNavigate();

  let tableData = [];
let tableRows = [];
let showMenu = false;


class RowData {
    constructor(username, topScore, heroCount, topLevel) {
        this.username = username;
        this.topScore = topScore;
        this.heroCount = heroCount;
        this.topLevel = topLevel;
    }

    list() {
        return [this.username, this.topScore, this.heroCount, this.topLevel]
    }
}


window.onload = async function() {
    if (!localStorage.getItem('username')) {
        navigate('/login');
    }
    document.querySelector('.dropdown-content').style.display = "none";
    
    getLoginInfo();

    const tableData = await getScoreData();
    
    displayTable(tableData);

}


function displayTable(tableData) {

    // format table data
    for (let scoreInfo of tableData) {
        let newRowData = new RowData(scoreInfo.username, scoreInfo.topScore, scoreInfo.numHeroes, scoreInfo.topLevel);

        tableRows.push(newRowData);
    }
    tableRows.sort((a, b) => b.topScore - a.topScore);
    
    // add each row to the table element
    let tableEl = document.getElementById('table');
   
    for (let scoreInfo of tableRows) {
        let newRowEl = document.createElement('tr');
        let newRowData = [scoreInfo.username, scoreInfo.topScore, scoreInfo.heroCount, scoreInfo.topLevel];


        for (let item of newRowData) {
            let td = document.createElement('td');
            td.textContent = item;
            newRowEl.appendChild(td);
            
            tableEl.appendChild(newRowEl);
        }
    }

}

function randomMessage() {
    let message = document.getElementById('challenge-notification');
    let chance = Math.floor(Math.random()*9 + 1);
    if (chance > 5) {
        message.style.display = "block";
    }
}

// --------- Challenge notification -------------- 
function closeMessage() {
    let message = document.getElementById('challenge-notification');
    message.style.display = "none";

}

function accept() {
    navigate('/challenge');

}

function toggleMenu() {
    showMenu = !showMenu;
    console.log(showMenu);
    if (showMenu == true) {
        document.querySelector('.dropdown-content').style.display = "flex";
        console.log("opened");
    } else {
        document.querySelector('.dropdown-content').style.display = "none";
        console.log("closed");
        
    }
}

async function getLoginInfo() {
    try {
        const response = await fetch('/api/get_login_info');

        if(!response.ok) {
            console.log("error")
            let username = localStorage.getItem('username');
            document.getElementById('username').textContent = username;
        } else {
            const data = await response.json();
            document.getElementById('username').textContent = data.username;
        }
        
    } catch(error) {
        console.log(error);
    }
}

getLoginInfo();

async function getScoreData() {
    const response = await fetch('/api/get_scoreData')
    const data = response.json();
    return data;
}



  return (
    <main className='scores-body'>
      <h1>Top Scores</h1>
        <table id="table">
            <thead>
                <tr id="headers">
                    <th>Username</th>
                    <th>High Score</th>
                    <th>Heroes</th>
                    <th>Top Level</th>
                </tr>
            </thead>
            <tbody>
                {/* Your table rows go here */}
            </tbody>
        </table>

        <div id="challenge-notification" className="message">
            <p>Aristotle's Bit Hero is weak!</p>
            <p>challenge him?</p>
            <p><button onClick={() => accept()}>Y</button><button onClick={() => closeMessage()}>N</button></p>
        </div>
       
    </main>
  );
}
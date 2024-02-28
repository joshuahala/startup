let tableData = [];
let tableRows = [];

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


window.onload = function() {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    }
    tableData = JSON.parse(localStorage.getItem("tableData"));
    if (!tableData) tableData = [];
    displayTable(tableData);

    setInterval(randomMessage, 3000);
}





function displayTable(tableData) {

    // format table data
    for (let scoreInfo of tableData) {
        let newRowData = new RowData(scoreInfo[0], scoreInfo[1], scoreInfo[2], scoreInfo[3]);

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
    window.location.href = "challenge.html";

}
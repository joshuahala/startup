
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
    addRow();
}

function addRow() {
    let tableEl = document.getElementById('table');
    let newRowData = new RowData("Jared", "24", "2", "2");
    let newRowEl = document.createElement('tr');

    for (let i = 0; i<4; i++) {
        let td = document.createElement('td');
        td.textContent = newRowData.list()[i];
        newRowEl.appendChild(td);
    }

    tableEl.appendChild(newRowEl);

}
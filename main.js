let currPlayer = "X";
const numOfRows = 3;
const tryPlays = numOfRows ** 2;
let tryPlaysCounter = 0;

const createBoardArr = () => {
    let board = [];
    for (let row = 0 ; row < numOfRows; row++){
        board.push(Array.from({ length: numOfRows }, () => "_"))
    }
    return board;
}
let board = createBoardArr();
const checkRows = (mark) => {
    let column = 0;
    for (let row = 0; row < numOfRows; row++) { 
        while (column < numOfRows) {
            if (board[row][column] !== mark) {
                column = 0;
                break;
            }
            column++;
        }
        if (column === numOfRows) { 
            return true;
        }
    }
}
const checkColumns = (mark) => {
    let row = 0;
    for (let column = 0; column < numOfRows; column++) { 
        while (row < numOfRows) {
            if (board[row][column] !== mark) {
                row = 0;
                break;
            }
            row++;
        }
        if (row === numOfRows) { 
            return true;
        }
    }
}
const checkDiago = (mark) => {
    let count = 0;
        while (count < numOfRows) {
            if (board[count][count] !== mark) {
                count = 0;
                break;
            }
            count++;
        }
        if (count === numOfRows) { 
            return true;
        }
    
}
const checkDiagoReverse = (mark) => {
    let count = 0;
        while (count < numOfRows) {
            if (board[count][numOfRows - 1 - count] !== mark) {
                count = 0;
                break;
            }
            count++;
        }
        if (count === numOfRows) { 
            return true;
        }
}
const checkWin = (currPlayer) => {
    if (checkRows(currPlayer)) {
        return true;
    }
    if (checkColumns(currPlayer)) {
        return true;
    }
    if (checkDiago(currPlayer)) {
        return true;
    }
    if (checkDiagoReverse(currPlayer)) {
        return true;
    }
}
const runWinEvent = (currPlayer) => {
    setTimeout(() => { 
        alert(`Player ${currPlayer} won!`);
    restBoard();
    },100)
}
const runDrawEvent = () => {
    setTimeout(() => { 
        alert("Draw!")
    restBoard();
    },100)
    
}
const restBoard = () => { 
    document.querySelector(".board").remove();
    creatBoard();
    board = createBoardArr();
    currPlayer = "X";
    tryPlaysCounter = 0;
}
const getCellPalce = (index, numOfRows) => { 
    const row = Math.floor(index / numOfRows);
    const col = index % numOfRows;
    return[row, col];
}
const drawMarkCell = (cell, currPlayer) => {
    cell.querySelector('.value').textContent = currPlayer;
        cell.classList.add(`cell--${currPlayer}`)
}
const clickHandler = (e, index) => {
    const cell = e.target;
    const [row , col] = getCellPalce(index,numOfRows)
    
    if (board[row][col] === "_") {
        tryPlaysCounter++;
        board[row][col] = currPlayer;
        drawMarkCell(cell, currPlayer);
        if (checkWin(currPlayer)) {
            runWinEvent(currPlayer);
        } else {
            if (tryPlaysCounter === tryPlays) {
                runDrawEvent();
            }

            currPlayer === "X" ? currPlayer = "O" : currPlayer = "X";
        }
    }
}
const creatBoard = () => {
    const container = document.querySelector(".container");
    const board = document.createElement("div");
    board.classList.add("board");
    for (let i = 0; i < numOfRows ** 2; i++) {
        const cellElementS = `<div class="cell" role="button" tabindex="${i+1}"><span class="value"></span></div>`
        const cellElement = document.createRange().createContextualFragment(cellElementS);
        cellElement.querySelector('.cell').onclick = (e) => clickHandler(e,i);
        cellElement.querySelector('.cell').onkeydown = (e) => e.key === "Enter"?clickHandler(e,i):true;
        board.appendChild(cellElement);
        document.documentElement.style.setProperty('--grid-rows',numOfRows)
    }
    container.insertAdjacentElement("afterbegin", board)
};  
document.getElementById("reset").onclick = restBoard;
creatBoard();